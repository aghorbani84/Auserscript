// ==UserScript==
// @name         Custom Ad Blocker for Persian Websites
// @namespace    https://abolfazlghorbani84.ir
// @version      0.5
// @description  Blocks ads and distractions on Persian websites, and other language in future.
// @author       AbolfazlGhorbani
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to block ads and remove distractions
    function modifyPage() {
        // CSS to hide ad elements, including common Persian ad classes
        const adStyles = `
            .ad, .advertisement, .ad-container, .sidebar-ad, .promo-banner,
            .intrusive-ad, .banner-ad, .ad_slot, .ad-section, 
            .adsbox, .ads-container, .popup-ad, .adframe,
            .تبلیغات, .بنر-تبلیغاتی, .تبلیغ, .آگهی, #ad, #ads, #banner,
            .ad-banner, .google-ads, .sponsored, .sponsorship, .adsense,
            [id^="ad_"], [class^="ad-"], [class*=" تبلیغ"], [id*="تبلیغ"] {
                display: none !important;
            }
        `;
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(adStyles));
        document.head.appendChild(style);

        // Remove specific distracting elements by class or ID
        const distractors = document.querySelectorAll('.sidebar, .navbar, .footer');
        distractors.forEach(element => {
            element.style.display = 'none';
        });

        // Add a custom feature: Dark Mode toggle
        const darkModeButton = document.createElement('button');
        darkModeButton.id = 'dark-mode-toggle';
        darkModeButton.textContent = 'تغییر به حالت تاریک';
        darkModeButton.style.position = 'fixed';
        darkModeButton.style.bottom = '20px';
        darkModeButton.style.right = '20px';
        darkModeButton.style.padding = '10px 20px';
        darkModeButton.style.backgroundColor = '#2196F3';
        darkModeButton.style.color = '#fff';
        darkModeButton.style.border = 'none';
        darkModeButton.style.borderRadius = '5px';
        darkModeButton.style.cursor = 'pointer';
        darkModeButton.style.zIndex = '9999';
        document.body.appendChild(darkModeButton);

        darkModeButton.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
        });

        // CSS for Dark Mode
        const darkModeStyles = `
            .dark-mode {
                background-color: #121212 !important;
                color: #fff !important;
            }
            .dark-mode a {
                color: #57aefd !important;
            }
        `;
        const darkStyle = document.createElement('style');
        darkStyle.type = 'text/css';
        darkStyle.appendChild(document.createTextNode(darkModeStyles));
        document.head.appendChild(darkStyle);
    }

    // Run the modifyPage function when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        modifyPage();
    });

    // Watch for dynamically added elements and apply modifications
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Re-apply ad blocking and distraction removal on new elements
                        const adElements = node.querySelectorAll('.ad, .advertisement, .ad-container, .sidebar-ad, .promo-banner, .intrusive-ad, .banner-ad, .ad_slot, .ad-section, .تبلیغات, .بنر-تبلیغاتی, .تبلیغ, .آگهی, #ad, #ads, #banner');
                        adElements.forEach(ad => ad.style.display = 'none');

                        const distractorElements = node.querySelectorAll('.sidebar, .navbar, .footer');
                        distractorElements.forEach(distractor => distractor.style.display = 'none');
                    }
                });
            }
        });
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
