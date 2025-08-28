// ==UserScript==
// @name         WME Place Update Full Image Downloader (Blob Forced JPG)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds a button to download the full-size Place Update Request image as JPG in Waze Map Editor (with forced .jpg extension)
// @author       you
// @match        https://www.waze.com/editor*
// @match        https://www.waze.com/*/editor*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waze.com
// @grant        GM_xmlhttpRequest
// @connect      venue-image.waze.com
// ==/UserScript==

(function() {
    'use strict';

    function createButton(imgEl, fullUrl, idPart) {
        if (imgEl.parentNode.querySelector('.wme-fullsize-btn')) return; // avoid duplicates

        const btn = document.createElement('button');
        btn.textContent = "Download Full Image";
        btn.className = 'wme-fullsize-btn';
        btn.style.marginLeft = "6px";
        btn.style.padding = "2px 6px";
        btn.style.fontSize = "12px";
        btn.style.cursor = "pointer";

        btn.addEventListener('click', () => {
            GM_xmlhttpRequest({
                method: "GET",
                url: fullUrl,
                responseType: "blob",
                onload: function(response) {
                    const blob = response.response;
                    const blobUrl = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = blobUrl;
                    a.download = idPart + ".jpg"; // force .jpg extension
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(blobUrl);
                }
            });
        });

        imgEl.parentNode.appendChild(btn);
    }

    function processImages() {
        const images = document.querySelectorAll('img[src*="venue-image.waze.com/thumbs/thumb700_"]');
        images.forEach(img => {
            const thumbUrl = img.src;
            const idPart = thumbUrl.match(/thumb700_([^.?]+)/)[1]; // extract just the GUID
            const fullUrl = thumbUrl
                .replace('/thumbs/thumb700_', '/')
                .replace(/\.jpg$/i, ''); // strip extension if present
            createButton(img, fullUrl, idPart);
        });
    }

    // Observe DOM changes in WME
    const observer = new MutationObserver(() => {
        processImages();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Run on page load too
    processImages();
})();