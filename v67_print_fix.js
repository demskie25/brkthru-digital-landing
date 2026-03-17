const fs = require('fs');

function superContain(filename) {
    if (!fs.existsSync(filename)) {
        console.log(`File not found: ${filename}`);
        return;
    }
    let content = fs.readFileSync(filename, 'utf8');
    const target = '  .chart-labels-container {';
    const newCss = `
  /* V67 Surgical Annihilation of Print Glitches */
  .backdoor-indicator, nav, header, .univ-header, .sticky, .fixed, #checkout-popup, [style*="position: fixed"], [style*="position: sticky"] { display: none !important; }
  
  /* Force graph background colors to print */
  #scoreChart div, .chart-container div, .bar-fill { 
      print-color-adjust: exact !important; 
      -webkit-print-color-adjust: exact !important; 
  }
  
  /* Stop SVG circle from shifting right and clipping */
  .circular-diagram-container { 
      width: 100% !important; 
      max-width: 100% !important; 
      margin: 0 auto !important; 
      display: flex !important; 
      justify-content: center !important; 
  }
  .circular-diagram-container svg { 
      max-width: 100% !important; 
      height: auto !important; 
  }
  
  /* Stop text cutting off on the right */
  body, html, #root, main, .app-container, .pdf-section-block { 
      width: 100% !important; 
      max-width: 100vw !important; 
      margin: 0 !important; 
      padding: 0 !important; 
      box-sizing: border-box !important; 
      overflow-x: hidden !important; 
  }
  
  /* Add safe paddings only to the inner blocks to prevent edge bleed */
  .pdf-section-block, .app-container {
      padding: 0 10mm !important;
  }

  h1, h2, h3, p, div, span, li { 
      max-width: 100% !important; 
      word-wrap: break-word !important; 
      overflow-wrap: break-word !important; 
      box-sizing: border-box !important; 
  }

  .chart-labels-container {`;

    if (content.includes(target) && !content.includes('V67 Surgical')) {
        content = content.replace(target, newCss);
        fs.writeFileSync(filename, content);
        console.log(`Updated ${filename}.`);
    } else {
        console.log(`Target not found in ${filename} or already patched.`);
    }
}
superContain('e:/brkthru-digital-landing/assessments.html');
superContain('e:/brkthru-digital-landing/start-enneagram.html');
