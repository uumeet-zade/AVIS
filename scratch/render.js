const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 1024 });
    const svgPath = path.resolve('../public/favicon.svg');
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
        <style>
            body, html { margin: 0; padding: 0; width: 1024px; height: 1024px; overflow: hidden; }
            svg { width: 1024px; height: 1024px; }
        </style>
    </head>
    <body>
        ${svgContent}
    </body>
    </html>
    `;
    
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Evaluate to wait for fonts to load explicitly
    await page.evaluate(async () => {
        await document.fonts.ready;
    });

    await page.screenshot({ path: '../public/favicon.png', omitBackground: true });
    await browser.close();
    console.log("Done rendering.");
})();
