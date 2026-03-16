const fs = require('fs');

function applyContainment(filename) {
    if (!fs.existsSync(filename)) {
        console.log(`File not found: ${filename}`);
        return;
    }
    let content = fs.readFileSync(filename, 'utf8');
    const target = '@media print {\n  .chart-labels-container {';
    const replacement = `@media print {
  body, html, #root, main, .app-container, .pdf-section-block { width: 100% !important; max-width: 100% !important; margin: 0 !important; padding: 0 15mm !important; box-sizing: border-box !important; overflow-x: hidden !important; }
  h1, h2, h3, p, div { margin-left: 0 !important; }
  .chart-labels-container {`;
    
    if (content.includes(target)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(filename, content);
        console.log(`Updated ${filename}`);
    } else {
        console.log(`Target not found in ${filename}`);
    }
}

applyContainment('e:/brkthru-digital-landing/assessments.html');
applyContainment('e:/brkthru-digital-landing/start-enneagram.html');
