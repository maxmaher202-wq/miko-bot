# ميكو — Miko Messenger Bot

بوت دردشة عربي لمجموعات Facebook Messenger باستخدام **Meta Messenger Platform API الرسمي**. لا يستخدم كوكيز الحسابات أو تسجيل دخول المستخدمين.

## المتطلبات

- Node.js 18 أو أحدث
- Facebook Page
- Meta App مرتبطة بالصفحة
- Page Access Token
- رابط HTTPS عام، مثل Render أو Railway أو VPS

## الإعداد المحلي

1. ثبّت الحزم:

```bash
npm install
```

2. أنشئ ملف `.env` في جذر المشروع:

```env
PAGE_ACCESS_TOKEN=ضع_رمز_الوصول_هنا
VERIFY_TOKEN=رمز_سري_من_اختيارك
APP_SECRET=اختياري_للتحقق_من_توقيع_ميتا
PORT=3000
BOT_NAME=ميكو
```

3. شغّل البوت:

```bash
npm start
```

## إعداد Webhook في Meta

في لوحة Meta Developer:

1. أضف منتج **Messenger** إلى التطبيق.
2. ضع رابط Callback URL:
   `https://YOUR-DOMAIN.example/webhook`
3. ضع نفس قيمة `VERIFY_TOKEN` الموجودة في `.env`.
4. اشترك في أحداث الصفحة، خصوصًا `messages` و`messaging_postbacks` عند الحاجة.
5. استخدم Page Access Token في `PAGE_ACCESS_TOKEN`.

اختبر الصحة عبر:

`https://YOUR-DOMAIN.example/health`

## الأوامر العربية

- `مساعدة`
- `ping`
- `الوقت`
- `معلومات`
- `منشن`
- `نكتة`
- `ميكو ...`
- التحيات مثل `السلام عليكم` و`صباح الخير`

## مجموعات Messenger

يستقبل البوت الأحداث التي ترسلها Meta إلى الصفحة. دعم المحادثات الجماعية يعتمد على نوع محادثة Messenger وإعدادات الصفحة واشتراكات التطبيق لدى Meta؛ يجب اختبار ذلك بعد ربط الصفحة والويبهوك.

## النشر على Render

- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/health`
- أضف متغيرات `.env` من صفحة Environment في Render، ولا ترفع `.env` إلى GitHub.

