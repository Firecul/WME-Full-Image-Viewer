// ==UserScript==
// @name         WME Place Update Full Image Viewer + Downloader
// @namespace    http://tampermonkey.net/
// @version      1.2.1
// @description  Popup viewer for full-size Place Update Request images in WME, with forced JPG download option and background-close support
// @author       Firecul
// @match        https://www.waze.com/editor*
// @match        https://www.waze.com/*/editor*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waze.com
// @grant        GM_xmlhttpRequest
// @connect      venue-image.waze.com
// ==/UserScript==

(function() {
    'use strict';

    function showPopup(fullUrl, idPart) {
        // Remove existing popup if already open
        let existing = document.querySelector('#wme-fullimage-popup');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = "wme-fullimage-popup";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,0.7)";
        overlay.style.zIndex = "99999";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.flexDirection = "column";

        // Close on background click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });

        const img = document.createElement('img');
        img.src = fullUrl;
        img.style.maxWidth = "95%";
        img.style.maxHeight = "95%";
        img.style.boxShadow = "0 0 20px #000";
        img.style.border = "4px solid white";
        img.style.borderRadius = "8px";
        img.style.background = "white";

        const btnRow = document.createElement('div');
        btnRow.style.marginTop = "15px";
        btnRow.style.display = "flex";
        btnRow.style.gap = "10px";

        // Download button
        const dlBtn = document.createElement('button');
        dlBtn.textContent = "Download JPG";
        dlBtn.style.padding = "6px 12px";
        dlBtn.style.cursor = "pointer";
        dlBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // don’t trigger background close
            GM_xmlhttpRequest({
                method: "GET",
                url: fullUrl,
                responseType: "blob",
                onload: function(response) {
                    const blob = response.response;
                    const blobUrl = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = blobUrl;
                    a.download = idPart + ".jpg";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(blobUrl);
                }
            });
        });

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = "Close";
        closeBtn.style.padding = "6px 12px";
        closeBtn.style.cursor = "pointer";
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // don’t trigger background close
            overlay.remove();
        });

        btnRow.appendChild(dlBtn);
        btnRow.appendChild(closeBtn);

        overlay.appendChild(img);
        overlay.appendChild(btnRow);
        document.body.appendChild(overlay);
    }

    function createButton(imgEl) {
        if (imgEl.parentNode.querySelector('.wme-fullsize-btn')) return; // avoid duplicates

        const btn = document.createElement('button');
        btn.textContent = "View Full Image";
        btn.className = 'wme-fullsize-btn';
        btn.style.marginLeft = "6px";
        btn.style.padding = "2px 6px";
        btn.style.fontSize = "12px";
        btn.style.cursor = "pointer";

        btn.addEventListener('click', () => {
            const thumbUrl = imgEl.src;
            const idMatch = thumbUrl.match(/thumb700_([^.?]+)/);
            if (!idMatch) return;
            const idPart = idMatch[1];
            const fullUrl = thumbUrl
                .replace('/thumbs/thumb700_', '/')
                .replace(/\.jpg$/i, '');
            showPopup(fullUrl, idPart);
        });

        imgEl.parentNode.appendChild(btn);
    }

    function processImages() {
        const images = document.querySelectorAll('img[src*="venue-image.waze.com/thumbs/thumb700_"]');
        images.forEach(img => {
            const thumbUrl = img.src;
            const idMatch = thumbUrl.match(/thumb700_([^.?]+)/);
            if (!idMatch) return;
            const idPart = idMatch[1];
            const fullUrl = thumbUrl
                .replace('/thumbs/thumb700_', '/')
                .replace(/\.jpg$/i, '');
            createButton(img, fullUrl, idPart);
        });
    }

    const observer = new MutationObserver(() => {
        processImages();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    processImages();
})();