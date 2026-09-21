require("dotenv").config();

const required = ["PAGE_ACCESS_TOKEN", "VERIFY_TOKEN"];
for (const name of required) {
  if (!process.env[name]) {
    console.warn(`Missing environment variable: ${name}`);
  }
}

module.exports = {
  pageAccessToken: process.env.PAGE_ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET,
  port: Number(process.env.PORT) || 3000,
  botName: process.env.BOT_NAME || "ميكو"
};
