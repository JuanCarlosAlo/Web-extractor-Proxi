const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');
const beautify = require('js-beautify').html;

async function extractHtml(url) {
  const browser = await puppeteer.launch({
    headless: true, // Puedes mantener esto como true o 'new'
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
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

  const shouldSkipSection = (section) => {
    const classList = Array.from(section.classList);
    return stopClasses.some(cls => classList.includes(cls));
  };

  let htmlContent = '';

  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    if (!shouldSkipSection(section)) {
      htmlContent += section.outerHTML;
    }
  });

  const baseDomain = new URL(baseUrl).origin;

  htmlContent = htmlContent.replace(/background-image:\s*url\(["']?(https?:\/\/[^"'\)]*)["']?\)/g, (match, p1) => {
    return `background-image: url("${p1.replace(baseDomain, '/wp-content')}")`;
  });

  htmlContent = htmlContent.replace(new RegExp(baseDomain, 'g'), '/wp-content');
  htmlContent = htmlContent.replace(/(href|src)="\/([^"]+)"/g, (match, attr, url) => {
    return `${attr}="${baseDomain}/${url}"`;
  });

  htmlContent = htmlContent.replace(/url\(&quot;/g, 'url("');
  htmlContent = htmlContent.replace(/&quot;\)/g, '")');
  htmlContent = htmlContent.replace(/url\(&#34;/g, 'url("');
  htmlContent = htmlContent.replace(/&#34;\)/g, '")');

  return htmlContent;
}

module.exports = { extractHtml };
