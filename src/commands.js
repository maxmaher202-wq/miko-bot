const startedAt = Date.now();

function uptime() {
  const seconds = Math.floor((Date.now() - startedAt) / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;
  return `${hours}س ${minutes}د ${rest}ث`;
}

const help = `ميكو بوت 🤖\n\nالأوامر المتاحة:\n• مساعدة — عرض هذه القائمة\n• منشن — طريقة استخدام المنشن\n• الوقت — وقت تشغيل البوت\n• ping — اختبار استجابة البوت\n• معلومات — معلومات عن ميكو\n• نكتة — نكتة قصيرة\n• صباح الخير / مساء الخير — تحية ميكو`;

const jokes = [
  "مرة مبرمج راح للدكتور، قال له: عندي مشكلة في الذاكرة. قاله الدكتور: من متى؟ قال: من متى ماذا؟ 😄",
  "ليش الكمبيوتر بردان؟ لأنه فاتح Windows 😂",
  "واحد سأل ميكو: تفهم كل شيء؟ قال: أفهم كثيرًا، لكن لا أفهم لماذا لم تضغط إعجابًا بعد 😄"
];

async function getReply(rawText, context = {}) {
  const text = rawText.toLowerCase().trim();

  if (/^(مساعدة|help|الاوامر|الأوامر|اوامر|أوامر|\/help)$/.test(text)) return help;
  if (/^(ping|بنق|بينغ)$/.test(text)) return "pong 🟢 ميكو يعمل بشكل ممتاز.";
  if (/^(الوقت|uptime|وقت التشغيل)$/.test(text)) return `وقت تشغيل ميكو: ${uptime()}`;
  if (/^(معلومات|about|من انت|من أنت)$/.test(text)) {
    return "أنا ميكو 🤖 بوت عربي للمجموعات، أساعد في الأوامر والردود والترفيه.";
  }
  if (/^(منشن|المنشن)$/.test(text)) {
    return "اكتب اسم ميكو أو ابدأ رسالتك بكلمة (ميكو)، وسأحاول الرد عليك.";
  }
  if (/^(نكتة|نكت|joke)$/.test(text)) {
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
  if (/^(السلام عليكم|سلام|هلا|مرحبا|مرحبًا|اهلا|أهلا|صباح الخير|مساء الخير)$/.test(text)) {
    return text.includes("صباح") ? "صباح النور ☀️ أنا ميكو، كيف أساعدكم؟" : "وعليكم السلام ورحمة الله وبركاته 👋 أنا ميكو، كيف أساعدكم؟";
  }

  // الرد على الرسائل الموجهة إلى ميكو، مع إبقاء الدردشة العادية بدون إزعاج.
  if (/^(يا?\s*)?ميكو\b/.test(text)) {
    const question = rawText.replace(/^\s*(يا\s*)?ميكو[،,:!؟\s-]*/i, "").trim();
    return question ? `سمعتك يا صديقي 👋 بخصوص: ${question}` : "نعم؟ أنا ميكو معكم 🤖";
  }

  return null;
}

module.exports = { getReply };
