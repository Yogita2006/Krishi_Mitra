# Krishi Mitra

**Krishi Mitra** ("Farmer's Friend") is an AI-powered agricultural web platform that helps farmers make smarter, data-driven decisions. By combining machine learning models with a clean, responsive web interface, the platform delivers two core capabilities: predicting crop yield based on agricultural parameters, and identifying soil types from images to guide crop planning.

---

## Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [ML Model Setup](#ml-model-setup)
- [Machine Learning Models](#machine-learning-models)
  - [Crop Yield Regression](#crop-yield-regression)
  - [Soil Type Classification](#soil-type-classification)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contributors](#contributors)

---

## Overview

Agriculture in India faces persistent challenges — unreliable yield estimates, difficulty identifying optimal crops for specific soil conditions, and limited access to data-driven tools. Krishi Mitra addresses these issues by offering a unified web interface backed by trained Python ML models, enabling farmers and agronomists to get actionable insights quickly.

The project was built as a full-stack solution: a modern React + TypeScript frontend served via Vite, two Python-based machine learning pipelines for prediction tasks, and Cloudflare Workers for edge deployment.

---

## Screenshots

**Home / Landing Page**

<img width="479" height="970" alt="image" src="https://github.com/user-attachments/assets/ecf694ca-6dcc-49f8-8835-df6b8f7a3056" />

---

**Crop Yield Prediction Page**

<img width="478" height="995" alt="image" src="https://github.com/user-attachments/assets/4b5bb272-3b89-4cb4-a7bb-c03583bfcdc4" />

---

**Weather Monitoring**

<img width="458" height="995" alt="image" src="https://github.com/user-attachments/assets/fd19bb13-40cf-4ea9-a5db-deb03382a081" />

---

**Profile**

<img width="451" height="999" alt="image" src="https://github.com/user-attachments/assets/31d89db0-5007-4fae-92cf-03f23041db84" />

---

## Features

**Crop Yield Prediction**
Uses a regression-based machine learning model trained on agricultural datasets. Farmers or agronomists can input parameters such as soil nutrients, rainfall, temperature, and region to receive an estimated crop yield, helping with planning and resource allocation.

**Soil Type Classification via Image**
An image-based classification model that identifies the type of soil from a photograph. Understanding soil type is a critical first step in deciding which crops to grow and what amendments may be needed.

**Modern, Responsive Web Interface**
Built with React and TypeScript, styled with Tailwind CSS for a clean and accessible experience across devices. The interface is designed to be straightforward for non-technical users.

**Fast Development and Build Pipeline**
Powered by Vite for near-instant hot module replacement during development and optimized production builds.

**Edge Deployment Ready**
Configured with Cloudflare Workers via Wrangler for scalable, low-latency global deployment.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 with TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| ML Models | Python (scikit-learn / TensorFlow / Keras) |
| Linting | ESLint |
| Deployment | Cloudflare Workers (Wrangler) |
| Package Management | npm |

---

## Project Structure

```
Krishi_Mitra/
│
├── src/                            # React + TypeScript frontend source
│   ├── components/                 # Reusable UI components
│   ├── pages/                      # Application pages/views
│   └── main.tsx                    # Application entry point
│
├── public/                         # Static assets (images, icons, etc.)
│
├── crop-yield-regression/          # Python ML pipeline for crop yield prediction
│   ├── data/                       # Training datasets
│   ├── model/                      # Saved model files
│   ├── notebooks/                  # Jupyter notebooks for EDA and training
│   └── src/                        # Inference scripts and utilities
│
├── soil_type_image_model/          # Python ML pipeline for soil classification
│   └── src/                        # Model training and inference code
│
├── docs/                           # Project documentation and assets
│   └── screenshots/                # UI screenshots for README
│
├── index.html                      # HTML entry point
├── vite.config.ts                  # Vite build configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── eslint.config.js                # ESLint configuration
├── wrangler.json                   # Cloudflare Workers deployment config
├── tsconfig.json                   # Root TypeScript configuration
├── tsconfig.app.json               # App-specific TypeScript config
├── tsconfig.node.json              # Node-specific TypeScript config
├── tsconfig.worker.json            # Worker-specific TypeScript config
├── package.json                    # Node.js dependencies and scripts
└── .gitignore
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed before setting up the project:

- [Node.js](https://nodejs.org/) — v18 or higher
- [npm](https://www.npmjs.com/) — comes bundled with Node.js
- [Python](https://www.python.org/) — v3.8 or higher (for ML models)
- [pip](https://pip.pypa.io/) — Python package manager

### Frontend Setup

Clone the repository and install Node.js dependencies:

```bash
git clone https://github.com/Yogita2006/Krishi_Mitra.git
cd Krishi_Mitra
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

To build for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

### ML Model Setup

Each ML model has its own directory and dependencies. Navigate to the relevant folder and install requirements.

**Crop Yield Regression:**

```bash
cd crop-yield-regression
pip install -r requirements.txt
```

**Soil Type Image Classification:**

```bash
cd soil_type_image_model
pip install -r requirements.txt
```

Refer to any notebooks or README files within each model directory for dataset preparation and training instructions.

---

## Machine Learning Models

### Crop Yield Regression

This model takes structured agricultural inputs and predicts the expected crop yield. It is trained using regression techniques on historical crop yield datasets.

**Typical input features may include:**

- Nitrogen (N), Phosphorus (P), Potassium (K) content in soil
- Rainfall (mm)
- Temperature (°C)
- Humidity (%)
- Soil pH level
- Crop type / region

**Output:** Predicted yield (e.g., tonnes per hectare)

The model is located in the `crop-yield-regression/` directory. Training notebooks are available in the `notebooks/` subdirectory for reference.

### Soil Type Classification

This is an image classification model that takes a photograph of soil as input and predicts the soil type category.

**Example soil categories the model can identify:**

- Alluvial Soil
- Black / Regur Soil
- Red Soil
- Laterite Soil
- Sandy Soil
- Clay Soil

**Input:** An image file (JPG/PNG) of soil  
**Output:** Predicted soil type label with confidence score

The model code is located in the `soil_type_image_model/src/` directory.

---

## Deployment

The frontend is configured for deployment on Cloudflare Workers using [Wrangler](https://developers.cloudflare.com/workers/wrangler/).

To deploy:

```bash
npm run build
npx wrangler deploy
```

Ensure you have a Cloudflare account and have authenticated via `wrangler login` before deploying. Refer to `wrangler.json` for deployment configuration details.

---

## Contributing

Contributions are welcome. If you'd like to improve the project, fix a bug, or add a new feature, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or fix

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit them with a clear message

   ```bash
   git commit -m "Add: description of your change"
   ```

4. Push your branch to your fork

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a Pull Request against the `main` branch of this repository

For major changes or new features, please open an issue first to discuss the proposed change before starting work.

---

## License

This project is open source. Please refer to the repository for license details, or add a `LICENSE` file to clarify the terms under which this project is distributed.

---

> Empowering farmers with technology for a better harvest.
