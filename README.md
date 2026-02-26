# 🌾 Krishi Mitra — Your Farming Companion

**Krishi Mitra** (meaning "Farmer's Friend" in Hindi) is an AI-powered agricultural platform designed to help farmers make smarter, data-driven decisions. The platform combines machine learning models with a modern web interface to provide crop yield predictions and soil type analysis.

---

## ✨ Features

- **Crop Yield Prediction** — Regression-based ML model that estimates crop yield based on relevant agricultural inputs.
- **Soil Type Classification** — Image recognition model that identifies soil types from photographs to guide farmers in crop selection.
- **Modern Web Interface** — Responsive, user-friendly frontend built with React and TypeScript.
- **Fast Development Server** — Powered by Vite for an optimized development experience.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Tailwind CSS |
| Build Tool | Vite |
| ML Models | Python (crop yield regression, soil image classification) |
| Deployment | Cloudflare Workers (Wrangler) |

---

## 📁 Project Structure

```
Krishi_Mitra/
├── src/                        # React frontend source code
├── public/                     # Static assets
├── crop-yield-regression/      # Python ML model for crop yield prediction
├── soil_type_image_model/      # Python ML model for soil type classification
├── docs/                       # Documentation
├── index.html                  # App entry point
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── wrangler.json               # Cloudflare Workers configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Python](https://www.python.org/) (v3.8+ for ML models)
- npm

### Installation & Running the Dev Server

```bash
# Clone the repository
git clone https://github.com/Yogita2006/Krishi_Mitra.git
cd Krishi_Mitra

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Running the ML Models

Navigate to the respective model directory and follow the instructions within:

```bash
# For crop yield regression
cd crop-yield-regression
pip install -r requirements.txt

# For soil type image model
cd soil_type_image_model
pip install -r requirements.txt
```

---

## 🌱 Why Krishi Mitra?

Indian agriculture faces significant challenges — unpredictable yields, poor soil management awareness, and limited access to technology. Krishi Mitra bridges this gap by bringing AI and data-driven insights directly to farmers through an easy-to-use web platform.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss what you'd like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source. See the repository for license details.

---

## 👥 Contributors

Thanks to all contributors who have helped build Krishi Mitra! 🙏

---

> *"Empowering farmers with technology for a better harvest."*
