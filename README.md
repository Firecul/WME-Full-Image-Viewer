# WME Full Image Viewer

[![Latest Release](https://img.shields.io/github/v/release/Firecul/WME-Full-Image-Viewer?style=for-the-badge&logo=github)](https://github.com/Firecul/WME-Full-Image-Viewer/releases)
[![Install with Tampermonkey](https://img.shields.io/badge/Install%20with-Tampermonkey-black?logo=tampermonkey&style=for-the-badge)](https://github.com/Firecul/WME-Full-Image-Viewer/raw/refs/heads/main/WME%20Full%20Image%20Viewer.user.js)

A Tampermonkey userscript that enhances the **Waze Map Editor (WME)** photo viewer.  
By default, WME only shows compressed thumbnails of place photos or Place Update Request (PUR) photos.  
This script adds a button to **view the full-resolution image** and download it properly as a JPG.

---

## ✨ Features

- Adds a **"View Full Image"** button under each place/PUR photo thumbnail.
- Opens a **popup viewer** showing the original high-resolution image.
- Popup includes:
  - Background click to close
  - **Close** button
  - **Download JPG** button (forces correct `.jpg` extension with proper filename)
- Always works with the **currently displayed photo** — so if you use WME’s built-in arrows, the button updates.

---

## 🚀 Install

Click the button below to install directly with Tampermonkey:

[![Install with Tampermonkey](https://img.shields.io/badge/Install%20with-Tampermonkey-black?logo=tampermonkey&style=for-the-badge)](https://github.com/Firecul/WME-Full-Image-Viewer/raw/refs/heads/main/WME%20Full%20Image%20Viewer.user.js)

> 🔜 A GreasyFork version will be available soon for easier updates and wider userscript manager support.

---

## 🔧 Usage

1. Open a place or PUR in WME.
2. Click **"View Full Image"** under any thumbnail.
3. The popup viewer opens with the high-resolution photo.
4. Options inside the popup:
   - **Download JPG** → Save locally with correct filename.
   - **Close** → Exit popup.
   - Or click outside the image to close.

---

## ⚠️ Notes

- Waze’s image servers don’t serve images with a `.jpg` extension.  
  The script fetches them via `GM_xmlhttpRequest` and ensures downloads save correctly as `.jpg`.
- The button always reflects the **current image** shown in WME’s dialog, even if you navigate to the next/previous one.

---

## 📄 Metadata

- Script name: **WME Full Image Viewer**
- Author: Firecul
- Version: [Latest release](https://github.com/Firecul/WME-Full-Image-Viewer/releases)
- Repo: [github.com/Firecul/WME-Full-Image-Viewer](https://github.com/Firecul/WME-Full-Image-Viewer)
- Install link: [Raw script URL](https://github.com/Firecul/WME-Full-Image-Viewer/raw/refs/heads/main/WME%20Full%20Image%20Viewer.user.js)

---

## 💡 Potential Future Improvements

- Multi-image navigation inside the popup, synced with WME’s built-in arrows.
- Keyboard shortcuts (← / →) for cycling images in the popup.
- Smarter filenames (e.g. include place name + date).

---

## 🛠 Troubleshooting

- If the **"View Full Image"** button doesn’t appear, refresh WME and ensure the userscript is enabled in Tampermonkey.
- If downloads save without an extension, check your browser supports Tampermonkey’s `GM_xmlhttpRequest` API (all modern browsers do).

---

Happy mapping! 🗺️
