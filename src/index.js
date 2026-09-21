const express = require("express");
const crypto = require("node:crypto");
const { pageAccessToken, verifyToken, appSecret, port, botName } = require("./config");
const { sendText, sendTyping } = require("./messenger");
const { getReply } = require("./commands");

const app = express();
app.use(express.json({
  verify: (req, res, buffer) => {
    req.rawBody = buffer;
  }
}));

function validSignature(req) {
  if (!appSecret) return true;
  const signature = req.get("x-hub-signature-256");
  if (!signature || !req.rawBody) return false;

  const expected = `sha256=${crypto
    .createHmac("sha256", appSecret)
    .update(req.rawBody)
    .digest("hex")}`;

  return signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

app.get("/", (req, res) => {
  res.json({ status: "online", bot: botName, uptime: process.uptime() });
});

app.get("/health", (req, res) => {
  res.json({ ok: true, bot: botName, uptime: process.uptime() });
});

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === verifyToken) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

app.post("/webhook", async (req, res) => {
  if (!validSignature(req)) return res.sendStatus(403);
  if (req.body.object !== "page") return res.sendStatus(404);

  // Respond immediately so Meta does not retry the webhook.
  res.sendStatus(200);

  for (const entry of req.body.entry || []) {
    for (const event of entry.messaging || []) {
      if (!event.sender?.id || !event.message?.text || event.message.is_echo) continue;

      const senderId = event.sender.id;
      const text = event.message.text.trim();

      try {
        await sendTyping(senderId, true);
        const reply = await getReply(text, { senderId, botName });
        if (reply) await sendText(senderId, reply);
      } catch (error) {
        console.error("Message handling error:", error);
        await sendText(senderId, "حدث خطأ مؤقتًا. حاول مرة أخرى بعد قليل.");
      } finally {
        await sendTyping(senderId, false).catch(() => {});
      }
    }
  }
});

app.listen(port, () => {
  console.log(`${botName} Messenger bot is listening on port ${port}`);
});
