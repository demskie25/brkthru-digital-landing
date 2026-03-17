const fs = require('fs');

function injectV67(filename) {
    if (!fs.existsSync(filename)) {
        console.log(`File not found: ${filename}`);
        return;
    }
    let content = fs.readFileSync(filename, 'utf8');
    
    // We append a definitive V67 block right before </head>
    const newCss = `
<!-- V67 Surgical Annihilation of Print Glitches -->
<style id="v67-print-fix">
@media print {
  /* 1. Hide the yellow bar and all fixed navigation */
  .backdoor-indicator, nav, header, .univ-header, .sticky, .fixed, #checkout-popup, [style*="position: fixed"], [style*="position: sticky"] { display: none !important; }
  
  /* 2. Force graph background colors to print */
  #scoreChart div, .chart-container div, .bar-fill, .bg-blue-600, .bg-blue-500, *[class*="bg-"] { 
      print-color-adjust: exact !important; 
      -webkit-print-color-adjust: exact !important; 
  }
  
  /* 3. Stop SVG circle from shifting right and clipping */
  .circular-diagram-container { 
      width: 100% !important; 
      max-width: 100% !important; 
      margin: 0 auto !important; 
      display: flex !important; 
      justify-content: center !important; 
      padding-right: 0 !important;
  }
  .circular-diagram-container svg { 
      max-width: 100% !important; 
      height: auto !important; 
  }
  
  /* 4. Stop text cutting off on the right by crushing negative margins and bounds */
  body, html, #root, main, .app-container, .pdf-section-block { 
      width: 100% !important; 
      max-width: 100vw !important; 
      margin: 0 !important; 
      padding: 0 !important; 
      box-sizing: border-box !important; 
      overflow-x: hidden !important; 
  }
  
  /* Safe inner padding for boundaries */
  .pdf-section-block, .app-container {
      padding: 0 10mm !important;
  }

  p, div, span, li, h1, h2, h3, h4, h5 { 
      max-width: 100% !important; 
      word-wrap: break-word !important; 
      overflow-wrap: break-word !important; 
      box-sizing: border-box !important; 
  }
}
</style>
</head>`;

    if (!content.includes('V67 Surgical Annihilation')) {
        content = content.replace('</head>', newCss);
        fs.writeFileSync(filename, content);
        console.log(`Successfully injected V67 into ${filename}`);
    } else {
        console.log(`V67 already exists in ${filename}`);
    }
}

injectV67('e:/brkthru-digital-landing/assessments.html');
injectV67('e:/brkthru-digital-landing/start-enneagram.html');
