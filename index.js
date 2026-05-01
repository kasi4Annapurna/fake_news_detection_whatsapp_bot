const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const Groq = require('groq-sdk');
require('dotenv').config();

// 🧠 Setup GROQ
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// 🤖 WhatsApp bot
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('📱 Scan QR code:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot is ready!');
    console.log('✅ GROQ Key loaded:', process.env.GROQ_API_KEY ? 'YES ✅' : 'NO ❌');
});

client.on('message', async (message) => {
    const text = message.body;

    if (!text || text.trim() === '') return;

    if (text.toLowerCase() === '!help') {
        await message.reply(
            `🤖 *Fake Message Detector Bot*\n\n` +
            `Send me any suspicious message!\n\n` +
            `I detect:\n` +
            `🔴 Fake news\n` +
            `💸 Scams\n` +
            `💊 Health misinformation\n` +
            `📧 Phishing\n\n` +
            `Just paste any message!`
        );
        return;
    }

    console.log(`📨 Got message: "${text}"`);
    await message.reply('🔍 Checking this message... please wait!');

    try {
        const result = await checkIfFake(text);
        await message.reply(result);
    } catch (error) {
        console.error('ERROR:', error.message);
        await message.reply('❌ Error: ' + error.message);
    }
});

async function checkIfFake(messageText) {
    console.log('🧠 Sending to GROQ...');

    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
                role: 'system',
                content: 'You are a WhatsApp fake message detector. Analyze messages and detect if they are fake, spam, scam or real. Be concise and clear.'
            },
            {
                role: 'user',
                content: `Analyze this WhatsApp message:

"${messageText}"

Reply in this EXACT format only:
🔴 VERDICT: [FAKE / REAL / SUSPICIOUS / SPAM]

📊 CONFIDENCE: [percentage]

📝 REASON: [2-3 sentences]

⚠️ WARNING SIGNS: [list red flags or "None"]

✅ WHAT TO DO: [advice]`
            }
        ],
        max_tokens: 500,
    });

    const result = response.choices[0].message.content;
    console.log('✅ GROQ replied!');
    return result;
}

client.initialize();