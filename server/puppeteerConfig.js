// server/puppeteerConfig.js
const puppeteer = require('puppeteer');

module.exports = async function launchBrowser() {
    return puppeteer.launch({
        headless: 'new', // Ensure that headless mode works properly in newer versions
    });
};
