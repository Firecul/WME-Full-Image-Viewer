# WME Place Update Full Image Viewer + Downloader

A Tampermonkey userscript that enhances the **Waze Map Editor (WME)** Place Update Request (PUR) photo viewer.  
By default, WME only shows a small/medium thumbnail version of photos. This script makes it easy to view the **full-resolution image** and download it as a proper JPG file.

---

## 🚀 Install

[![Install directly with Tampermonkey](https://img.shields.io/badge/Install%20with-Tampermonkey-black?logo=tampermonkey&style=for-the-badge)](https://github.com/Firecul/WME-Place-Update-Full-Image-Downloader/raw/refs/heads/main/WME%20Place%20Update%20Full%20Image%20Button.user.js)

> 🔜 A GreasyFork version will be available soon for easier updates and wider userscript manager support.

---

## ✨ Features

- Adds a **"View Full Image"** button under each PUR/place photo thumbnail.
- Opens a **popup viewer** with the full-size image (bypassing the limited thumbnail version).
- Popup supports:
  - Background click to close
  - "Close" button
  - "Download JPG" button (forces correct `.jpg` extension and filename based on image ID)
- Button always works with the **currently displayed photo**, even when you use WME’s built-in prev/next navigation arrows.

---

## 🔧 Usage

1. Open a place or PUR in WME.
2. Click **"View Full Image"** under any thumbnail.
3. The popup viewer will display the high-resolution photo.
4. From the popup:
   - **Download JPG** → Save the image locally with a proper filename.
   - **Close** → Exit the popup.
   - Or click outside the image to close.

---

## ⚠️ Notes

- Waze’s image servers don’t serve images directly with a `.jpg` extension.  
  This script fetches them via `GM_xmlhttpRequest` and ensures downloads use the correct `.jpg` extension.
- The popup always opens the **current image shown in WME’s dialog** — so if you navigate with WME’s arrows, the button updates accordingly.

---

## 📄 Metadata

- Script name: **WME Place Update Full Image Viewer + Downloader**
- Author: Firecul
- Version: 1.2+
- Repo: [github.com/Firecul/WME-Place-Update-Full-Image-Downloader](https://github.com/Firecul/WME-Place-Update-Full-Image-Downloader)
- Install link: [Raw script URL](https://github.com/Firecul/WME-Place-Update-Full-Image-Downloader/raw/refs/heads/main/WME%20Place%20Update%20Full%20Image%20Button.user.js)

---

## 💡 Potential Future Improvements

- Multi-image navigation **inside the popup** (in sync with WME’s prev/next buttons).
- Keyboard arrow support (← / →) for cycling images directly in the popup.
- Optional automatic filename formatting (e.g. include place name + date).

---

## 🛠 Troubleshooting

- If the **"View Full Image"** button doesn’t appear, refresh WME and check that the userscript is enabled in Tampermonkey.
- If downloads save without an extension, check that your browser supports Tampermonkey’s `GM_xmlhttpRequest` API (all modern ones do).

---

Happy mapping! 🗺️
