// ==UserScript==
// @name        SSP Number highlighter
// @namespace    http://amazon.com/
// @version      0.1
// @description  Highlights specific numbers based on conditions
// @author     Ali Alshaker
// @match      https://trans-logistics-eu.amazon.com/ssp/dock/ob
// @match      https://trans-logistics-eu.amazon.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    function highlightCells() {
        setTimeout(function() {
            const recieved = document.querySelector('a[data-status="inFacilityReceived"]');
            const recievedValue = Number(recieved.textContent);;
            // bound receivedValue from 0 to 10
            const hue = (10 - Math.min(10, recievedValue)) * 10;
            recieved.parentNode.style.backgroundColor = `hsl(${hue}, 100%, 75%)`;

            const diverted = document.querySelector('a[data-status="diverted"]');
            const divertedValue = Number(diverted.textContent);;
            let color = divertedValue > 0 ? "hsl(0, 100%, 75%)":"hsl(100, 100%, 75%)";
            diverted.parentNode.style.backgroundColor = color;

            const stacked = document.querySelector('a[data-status="stacked"]');
            const stackedValue = Number(stacked.textContent);;
            color = stackedValue > 0 ? "hsl(0, 100%, 75%)":"hsl(100, 100%, 75%)";
            stacked.parentNode.style.backgroundColor = color;

            const staged = document.querySelector('tr a[data-status="staged"]');
            const stagedValue = Number(staged.textContent);;
            color = stagedValue > 0 ? "hsl(0, 100%, 75%)":"hsl(100, 100%, 75%)";
            staged.parentNode.style.backgroundColor = color;
        }, 500);
    }


    const mc = document.querySelector('#mainContent');

    const observer = new MutationObserver(function() {
        // Attach the function to the checkbox change event
        const checkboxes = document.querySelectorAll('#dashboard tr');
        checkboxes.forEach((checkbox) => {
            checkbox.removeEventListener('click', highlightCells);
            checkbox.addEventListener('click', highlightCells);
        });
    });

    observer.observe(mc, { attributes: false, childList: true, subtree: true });

})();
