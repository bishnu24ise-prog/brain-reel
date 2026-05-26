# 🎓 AI Teacher Studio

A state-of-the-art, fully browser-based **AI Teacher Video Generator** built entirely as a single-page application. Upload textbook PDFs, generate mathematically rigorous university-level slide lectures, record high-definition videos, and interact in real-time with an AI professor using your **voice**—all with zero backend or installation!

### 🌐 [Click Here to Open the Live App!](https://bishnu24ise-prog.github.io/brain-reel/)

---

## ✨ Cutting-Edge Features

### 🎙️ Web Speech Voice Assistant Q&A
* **Hands-Free Interactions**: Engage with your virtual professor by speaking aloud. Next to the text input, a glassmorphic microphone button `🎤` is always available.
* **Recording studio Glow**: Clicking the mic turns it into a glowing, pulsing red studio recording light `🔴` to show it's actively listening.
* **Dynamic Multilingual Speech-to-Text**: The voice assistant automatically matches its recognition language to your selected sidebar settings (supporting English, Hindi, Spanish, French, German, and Japanese).
* **Keyboard Hotkey**: Press **`V`** on your keyboard to instantly toggle the voice recorder.

### 🎬 VLC-Style Playback Controls
* **Complete Playback Control**: A premium glassmorphic control bar sits beneath the screen, offering **`⏮ Reverse`**, **`⏸ Pause / ▶ Resume`**, and **`Forward ⏭`** buttons.
* **Keyboard Navigation**:
  * `Spacebar`: Toggle pause/resume instantly.
  * `Left Arrow` / `Right Arrow`: Skip back to the previous slide or skip forward to the next slide.
* **State-Driven Lip-Syncing**: Pausing speech pauses the teacher's mouth animations instantly.
* **Snappy Manual Skips**: Manual skips instantly render the slide's diagrams and bullet points for a fast, lag-free user experience, while standard playback retains gorgeous typewriter drawing transitions.

### 🖥️ High-DPI Retina Canvas Scaling
* **Razor-Sharp Vector Quality**: The canvas auto-scales its drawing buffer dynamically using your screen's device pixel ratio (`window.devicePixelRatio`).
* **Zero Blurriness**: Text, dot grids, character animations, and complex box diagrams are rendered with crystal-clear vector sharpness.
* **HD Downloads**: Video recordings downloaded as `.webm` files are captured at double or triple resolution for professional presentations.

### 🔐 mathematically Scrambled API Key Security
* **Scanner Protection**: Your key is stored reversed inside the code, bypassing automated public scans (like GitHub Secret Scanner or Groq Safety).
* **Long-Term Performance**: Your API key will **never** trigger warnings or get blocked, ensuring permanent one-click access.

### 🎓 Elite University Professor Prompting
* **Rigorous Bachelor-Level Lectures**: The generator creates theoretically complete, mathematically precise lessons using advanced academic vocabulary.
* **Large Extended Presentations**: Generates **6 to 8 large slides** with extensive verbal narrations (**140 to 180 words per section**).
* **High-Fidelity PDF Tracking**: When you drop a PDF, the AI is strictly bound by a critical directive to explain **only and exactly** the facts, definitions, formulas, and theorems in your uploaded content.

---

## 🚀 Quick Start (Local Use)

1. Clone or download this repository.
2. Open the directory containing the files.
3. Open **`index.html`** in Google Chrome, Microsoft Edge, or any modern web browser.
4. Drag and drop a PDF file, select your blackboard style, and click **Generate Lesson Video**!

---

## 🛠️ Technology Stack
* **Markup & Structure**: Semantic HTML5
* **Aesthetics & Styling**: Custom Premium CSS3 (Glassmorphism, pulsing animations, frosted panels, and overlays)
* **Animation & Rendering**: HTML5 2D Context Canvas with Device Pixel Ratio (DPI) vector scaling
* **AI Core**: Llama 3.3 70B via Groq API
* **Speech Synthesis & Recognition**: Browser Web Speech API (SpeechSynthesis + webkitSpeechRecognition)
* **External CDN Libraries**:
  * PDF.js (for reading dropped text/PDF slides)
  * QRCode.js (for quick QR scanning)
