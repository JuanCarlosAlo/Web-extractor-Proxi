const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');
const beautify = require('js-beautify').html;

async function extractHtml(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  const html = await page.content();
  await browser.close();

  const filteredHtml = filterHtml(html, url);

  const formattedHtml = beautify(filteredHtml, { indent_size: 2, space_in_empty_paren: true });

  return formattedHtml;
}

function filterHtml(html, baseUrl) {
  const dom = new JSDOM(html);
  const { document } = dom.window;

  const stopClasses = ['contacto', 'mapas', 'banner', 'footer'];

  // Helper function to check if a section should be skipped
  const shouldSkipSection = (section) => {
    const classList = Array.from(section.classList);
    return stopClasses.some(cls => classList.includes(cls));
  };

  let htmlContent = '';

  // Filtra todas las secciones del body
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    if (!shouldSkipSection(section)) {
      htmlContent += section.outerHTML;
    }
  });

  const baseDomain = new URL(baseUrl).origin;

  // Reemplaza URLs absolutas en background-image correctamente
  htmlContent = htmlContent.replace(/background-image:\s*url\(["']?(https?:\/\/[^"'\)]*)["']?\)/g, (match, p1) => {
    return `background-image: url("${p1.replace(baseDomain, '/wp-content')}")`;
  });

  // Reemplaza URLs absolutas en href y src
  htmlContent = htmlContent.replace(new RegExp(baseDomain, 'g'), '/wp-content');
  
  // Corrige URLs relativas en href y src que comiencen con /
  htmlContent = htmlContent.replace(/(href|src)="\/([^"]+)"/g, (match, attr, url) => {
    return `${attr}="${baseDomain}/${url}"`;
  });

  // Corrige URLs dentro de estilos CSS
  htmlContent = htmlContent.replace(/url\(&quot;/g, 'url("');
  htmlContent = htmlContent.replace(/&quot;\)/g, '")');
  htmlContent = htmlContent.replace(/url\(&#34;/g, 'url("');
  htmlContent = htmlContent.replace(/&#34;\)/g, '")');

  return htmlContent;
}

module.exports = { extractHtml };
