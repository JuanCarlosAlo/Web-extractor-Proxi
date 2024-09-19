const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');
const beautify = require('js-beautify').html;

async function extractHtml(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  
  const html = await page.content();
  console.log("HTML completo obtenido:");
  console.log(html); // Para verificar que se obtiene el HTML completo
  
  await browser.close();

  // Extraemos las secciones
  const extractedHtml = extractSections(html, url);
  return beautify(extractedHtml, { indent_size: 2, space_in_empty_paren: true });
}

// Función que extrae todas las secciones sin ningún tipo de filtrado
function extractSections(html, baseUrl) {
  const dom = new JSDOM(html);
  const { document } = dom.window;

  let htmlContent = '';

  // Obtenemos todas las secciones <section> del documento
  const allSections = document.querySelectorAll('section');
  
  if (allSections.length === 0) {
    console.log("No se encontraron secciones <section> en el HTML.");
  } else {
    allSections.forEach((section, index) => {
      console.log(section.outerHTML); 
      htmlContent += section.outerHTML;
    });
  }

  const baseDomain = new URL(baseUrl).origin;

  // Reemplazamos URLs absolutas en href y src
  return htmlContent.replace(new RegExp(baseDomain, 'g'), '/wp-content')
    .replace(/(href|src)="\/([^"]+)"/g, (match, attr, url) => `${attr}="${baseDomain}/${url}"`)
    .replace(/url\(&quot;/g, 'url("')
    .replace(/&quot;\)/g, '")')
    .replace(/url\(&#34;/g, 'url("')
    .replace(/&#34;\)/g, '")');
}

module.exports = { extractHtml };
