const API_VERSION = "v21.0";
const { pageAccessToken } = require("./config");

async function callMessenger(payload) {
  if (!pageAccessToken) throw new Error("PAGE_ACCESS_TOKEN is not configured");

  const response = await fetch(
    `https://graph.facebook.com/${API_VERSION}/me/messages?access_token=${encodeURIComponent(pageAccessToken)}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    }
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Messenger API ${response.status}: ${details}`);
  }
  return response.json();
}

function sendText(recipientId, text) {
  return callMessenger({
    recipient: { id: recipientId },
    messaging_type: "RESPONSE",
    message: { text: String(text).slice(0, 2000) }
  });
}

function sendTyping(recipientId, typing) {
  return callMessenger({
    recipient: { id: recipientId },
    sender_action: typing ? "typing_on" : "typing_off"
  });
}

module.exports = { sendText, sendTyping };
