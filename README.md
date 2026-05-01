📱 WhatsApp Fake Message Detector Bot

A Node.js-based WhatsApp bot that detects fake news, scams, spam, phishing, and misinformation using AI.

This bot analyzes messages sent on WhatsApp and provides a verdict with explanation and safety advice.

🚀 Features
🔍 Detects:
Fake news
Scams
Spam messages
Phishing attempts
Health misinformation
🤖 AI-powered analysis using GROQ (LLaMA model)
📊 Structured response:
Verdict (FAKE / REAL / SUSPICIOUS / SPAM)
Confidence %
Reason
Warning signs
What to do
📱 Works directly inside WhatsApp
🛠️ Tech Stack
Node.js
whatsapp-web.js
GROQ API (LLaMA model)
dotenv
qrcode-terminal

Dependencies used:

📂 Project Structure
whatsapp-fake-detector/
│
├── index.js          # Main bot logic
├── package.json      # Dependencies & scripts
├── .env              # API keys (not included in repo)
└── README.md
⚙️ Installation
Clone the repository:
git clone https://github.com/your-username/whatsapp-fake-detector.git
cd whatsapp-fake-detector
Install dependencies:
npm install
🔑 Environment Setup

Create a .env file in the root directory:

GROQ_API_KEY=your_groq_api_key_here
▶️ Running the Bot
node index.js
A QR code will appear in the terminal
Scan it using WhatsApp (Linked Devices)
Bot will start running
💬 Usage
Command:
!help

Shows instructions.

Example:

Send any suspicious message:

"Click this link to win ₹50,000 instantly!!!"
Bot Response:
🔴 VERDICT: SPAM

📊 CONFIDENCE: 92%

📝 REASON: The message uses urgency and unrealistic rewards...

⚠️ WARNING SIGNS: Suspicious link, urgency, too-good-to-be-true offer

✅ WHAT TO DO: Do not click the link, report the sender
🧠 How It Works
WhatsApp messages are received using whatsapp-web.js
Message is sent to GROQ AI for analysis
AI returns structured response
Bot replies instantly to the user

Core logic:

⚠️ Important Notes
Keep your .env file private
Do NOT share your API keys
WhatsApp Web session is stored locally
Use responsibly
📌 Future Improvements
Add support for image/message verification
Multi-language support
Web dashboard
Database logging
