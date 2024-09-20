const puppeteer = require('puppeteer-core');
const { JSDOM } = require('jsdom');
const beautify = require('js-beautify').html;

async function extractHtml(url) {
    let browser;
    try {
        // Conexión a la instancia de Browserless en Railway
        browser = await puppeteer.connect({
            browserWSEndpoint: 'ws://https://browserless-production-e893.up.railway.app/?token=QspLDpEcp8lmujdfa6d80878f005b406209e9c25e2' // URL de tu instancia de Browserless
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
        const html = await page.content();

        // Extraer las secciones del HTML
        const extractedHtml = extractSections(html, url);
        return beautify(extractedHtml, { indent_size: 2, space_in_empty_paren: true });

    } catch (error) {
        console.error('Error during HTML extraction:', error);
        throw new Error('Error during HTML extraction');
    } finally {
        // Cerrar el navegador solo si se abrió
        if (browser) {
            await browser.close();
        }
    }
}

function extractSections(html, baseUrl) {
    const dom = new JSDOM(html);
    const { document } = dom.window;

    let htmlContent = '';

    // Obtener todas las secciones <section> del documento
    const allSections = document.querySelectorAll('section');
    allSections.forEach(section => {
        htmlContent += section.outerHTML;
    });

    const baseDomain = new URL(baseUrl).origin;
    return htmlContent.replace(new RegExp(baseDomain, 'g'), '/wp-content')
        .replace(/(href|src)="\/([^"]+)"/g, (match, attr, url) => `${attr}="${baseDomain}/${url}"`)
        .replace(/url\(&quot;/g, 'url("')
        .replace(/&quot;\)/g, '")')
        .replace(/url\(&#34;/g, 'url("')
        .replace(/&#34;\)/g, '")');
}

module.exports = { extractHtml };
