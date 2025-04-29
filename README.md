# 🎵 Music Player Web App

A dynamic, JavaScript-powered music player that allows users to browse folders of songs, play audio, view albums, and control playback seamlessly. It supports folder-based song discovery, playback UI controls, and volume handling.

---

## 🚀 Features

- 🎧 Play, pause, next, and previous controls  
- 📁 Album-based folder navigation  
- ⏱ Displays song duration in `MM:SS` format  
- 🔊 Volume control with mute/unmute toggle  
- 🖱 Click-to-seek progress bar  
- 📀 Dynamically loads songs and metadata from folders  
- 🖼 Displays album art and description from `info.json`

---

## 📂 Folder Structure

```
project-root/
│
├── songs/
│   ├── Trending/
│   │   ├── song1.mp3
│   │   ├── cover.jpg
│   │   └── info.json
│   └── AnotherAlbum/
│       ├── song2.mp3
│       ├── cover.jpg
│       └── info.json
├── img/
│   ├── play.svg
│   ├── pause.svg
│   ├── mute.svg
│   ├── volume.svg
│   └── music.svg
├── index.html
├── style.css
└── script.js
```

> Each album inside `/songs/` must contain an `info.json` with the following structure:

```json
{
  "title": "Album Title",
  "description": "Short description about the album"
}
```

---

## 🛠 How It Works

- Fetches albums from the `/songs/` folder.
- Loads each album’s `info.json` and `cover.jpg`.
- Displays clickable album cards.
- On album selection, dynamically lists all `.mp3` files.
- Clicking a song plays it, updates UI and playback bar.
- Volume and seek bar interactions are handled through event listeners.

---

## 📦 Technologies Used

- Vanilla JavaScript (ES6+)
- HTML5
- CSS3
- Browser APIs (`fetch`, `Audio`)
- Local server (e.g., VSCode Live Server or Python SimpleHTTPServer)

---

## 🔧 Setup Instructions

1. Clone this repo or copy the files.
2. Place your `.mp3` files inside folders under `songs/` and include `cover.jpg` + `info.json`.
3. Run a local development server (like Live Server in VSCode).
4. Open `http://127.0.0.1:5500` in your browser.
5. Click an album to start listening.

---

## 📝 License

This project is for learning and personal use. You may modify and distribute it for educational purposes.
