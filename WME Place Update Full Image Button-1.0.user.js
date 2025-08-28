// ==UserScript==
// @name         WME Place Update Full Image Button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a button to open the full-size Place Update Request image in Waze Map Editor
// @author       Firecul
// @match        https://www.waze.com/editor*
// @match        https://www.waze.com/*/editor*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=waze.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function createButton(imgEl, fullUrl) {
        if (imgEl.parentNode.querySelector('.wme-fullsize-btn')) return; // avoid duplicates

        const btn = document.createElement('button');
        btn.textContent = "Full Image";
        btn.className = 'wme-fullsize-btn';
        btn.style.marginLeft = "6px";
        btn.style.padding = "2px 6px";
        btn.style.fontSize = "12px";
        btn.style.cursor = "pointer";

        btn.addEventListener('click', () => {
            window.open(fullUrl, '_blank');
        });

        imgEl.parentNode.appendChild(btn);
    }

    function processImages() {
        const images = document.querySelectorAll('img[src*="venue-image.waze.com/thumbs/thumb700_"]');
        images.forEach(img => {
            const thumbUrl = img.src;
            const fullUrl = thumbUrl
                .replace('/thumbs/thumb700_', '/')
                .replace(/\.jpg$/i, ''); // remove extension if present
            createButton(img, fullUrl);
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
