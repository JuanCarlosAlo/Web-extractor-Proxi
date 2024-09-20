const puppeteer = require('puppeteer-core');
const { JSDOM } = require('jsdom');
const beautify = require('js-beautify').html;

async function extractHtml(url) {
    let browser;
    try {
        browser = await puppeteer.connect({
            browserWSEndpoint: 'wss://production-sfo.browserless.io?token=QspLDpEcp8lmujdfa6d80878f005b406209e9c25e2'
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
        const html = await page.content();
        const extractedHtml = extractSections(html, url);
        return beautify(extractedHtml, { indent_size: 2, space_in_empty_paren: true });

    } catch (error) {
        console.error('Error during HTML extraction:', error);
        throw new Error('Error during HTML extraction');
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

function extractSections(html, baseUrl) {
    const dom = new JSDOM(html);
    const { document } = dom.window;

    let htmlContent = '';
    const mainContent = document.querySelector('.main-content');

    if (mainContent) {
        // Extraer secciones solo dentro de main-content
        const allSections = mainContent.querySelectorAll('section');
        for (const section of allSections) {
            if (section.classList.contains('contacto')) {
                break; // Detenerse si se encuentra una sección con la clase "contacto"
            }
            htmlContent += section.outerHTML;
        }
    } else {
        // Extraer todas las secciones si main-content no existe
        const allSections = document.querySelectorAll('section');
        for (const section of allSections) {
            if (section.classList.contains('contacto')) {
                break; // Detenerse si se encuentra una sección con la clase "contacto"
            }
            htmlContent += section.outerHTML;
        }
    }

    const baseDomain = new URL(baseUrl).origin;
    return htmlContent.replace(new RegExp(baseDomain, 'g'), '/wp-content')
        .replace(/(href|src)="\/([^"]+)"/g, (match, attr, url) => `${attr}="${baseDomain}/${url}"`)
        .replace(/url\(&quot;/g, 'url("')
        .replace(/&quot;\)/g, '")')
        .replace(/url\(&#34;/g, 'url("')
        .replace(/&#34;\)/g, '")');
}

module.exports = { extractHtml };
