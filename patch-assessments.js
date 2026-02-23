const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'assessments.html');
const logoPath = path.join(__dirname, 'images', 'brkthru-logo.png');

try {
    console.log(`Opening ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');

    console.log("File loaded. Applying replacements...");

    // 1. Update Alpine.js x-data
    const oldXData = '<body x-data="{ enneagramUnlocked: new URLSearchParams(window.location.search).get(\'status\') === \'completed\', backdoorClicks: 0 }">';
    const newXData = '<body x-data="{ enneagramUnlocked: new URLSearchParams(window.location.search).get(\'status\') === \'completed\' || new URLSearchParams(window.location.search).get(\'access\') === \'enneagram\' || new URLSearchParams(window.location.search).get(\'test\') === \'true\', backdoorClicks: 0 }">';
    content = content.replace(oldXData, newXData);

    // 2. Update logo path in header
    content = content.replace('images/brkthru-logo2.png', 'images/brkthru-logo.png');

    // 3. Update PDF Engine
    console.log(`Reading logo from ${logoPath}...`);
    let logoB64 = "";
    if (fs.existsSync(logoPath)) {
        logoB64 = fs.readFileSync(logoPath).toString('base64');
    } else {
        console.warn("Logo path not found, using empty string for logoB64");
    }

    const newEngine = `            // --- 2. PREMIUM PDF GENERATION ENGINE ---
            window.generatePDF = function() {
                const element = document.getElementById('pdfContentArea');
                const userName = (participantData && participantData.firstName) ? (participantData.firstName + ' ' + participantData.familyName) : 'Leader';
                
                // Activate Rendering Mode
                element.classList.add('pdf-rendering');

                // DYNAMIC DOM MODIFICATIONS FOR PDF:
                
                // Hide ALL giant H1 titles 
                const h1s = element.querySelectorAll('h1');
                h1s.forEach(h1 => h1.classList.add('no-pdf'));

                // Insert Professional Header
                const brandedHeader = document.createElement('div');
                brandedHeader.className = 'pdf-only pdf-header';
                brandedHeader.innerHTML = '<strong>Full Enneagram Assessment Report</strong><br>Prepared for: ' + userName + ' | Brkthru Digital V125';
                element.insertBefore(brandedHeader, element.firstChild);

                // Fix Page Breaks
                const typeResult = document.getElementById('typeResult');
                if (typeResult) typeResult.classList.add('page-break-before', 'report-card');
                
                const diagramContainer = document.querySelector('.circular-diagram-container');
                let originalSvgDisplay = '';
                let tempImg = null;
                const svg = document.getElementById('enneagramCircleSvg');

                if (diagramContainer) {
                    diagramContainer.classList.add('page-break-before');
                    
                    if(svg) {
                        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                        
                        const styleSheet = document.createElementNS("http://www.w3.org/2000/svg", "style");
                        styleSheet.textContent = \`
                            .enneagram-outer-path { stroke: #B8860B; stroke-width: 2.5; }
                            .enneagram-inner-line { stroke: #FFD700; stroke-width: 1.5; opacity: 0.6; }
                            .enneagram-node-circle.other-type { fill: #FFF8DC; stroke: #000080; }
                            .enneagram-node-circle.primary-type { fill: #FFD700; stroke: #B8860B; stroke-width: 3; }
                            .enneagram-node-circle.wing-type { fill: #9ACD32; stroke: #B8860B; }
                            .enneagram-node-text { font-family: sans-serif; font-size: 16px; fill: #fff; }
                            .enneagram-node-text.other-type { fill: #000080; }
                            .wing-indicator-text { font-size: 10px; font-weight: bold; fill: #4A148C; text-anchor: middle; font-family: sans-serif; }
                        \`;
                        svg.insertBefore(styleSheet, svg.firstChild);

                        const serializer = new XMLSerializer();
                        let source = serializer.serializeToString(svg);
                        
                        if(!source.match(/^<\\?xml/)){
                            source = '<?xml version="1.0" standalone="no"?>\\r\\n' + source;
                        }

                        const base64EncodedSVG = btoa(unescape(encodeURIComponent(source)));
                        
                        tempImg = document.createElement('img');
                        tempImg.id = 'tempPdfImage';
                        tempImg.style.width = '600px';
                        tempImg.style.height = '600px';
                        tempImg.style.display = 'block';
                        tempImg.style.margin = '0 auto';
                        
                        originalSvgDisplay = svg.style.display;
                        svg.style.display = 'none';
                        diagramContainer.insertBefore(tempImg, svg);
                        
                        svg.removeChild(styleSheet);
                    }
                }

                const executePdf = function() {
                    const resultsSectionItems = document.querySelectorAll('.report-card');
                    resultsSectionItems.forEach(el => el.classList.add('html2pdf__page-break-avoid'));

                    const opt = {
                        margin:       [0.5, 0.5, 1.0, 0.5], 
                        filename:     'Enneagram_Report_' + userName.replace(/\\s+/g, '_') + '.pdf',
                        image:        { type: 'jpeg', quality: 0.98 },
                        html2canvas:  { 
                            scale: 2, 
                            useCORS: true, 
                            letterRendering: true, 
                            scrollY: 0
                        },
                        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
                        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
                    };

                    html2pdf().set(opt).from(element).toPdf().get('pdf').then(function(pdf) {
                        const totalPages = pdf.internal.getNumberOfPages();
                        const pageWidth = pdf.internal.pageSize.getWidth();
                        const pageHeight = pdf.internal.pageSize.getHeight();
                        
                        for (let i = 1; i <= totalPages; i++) {
                            pdf.setPage(i);
                            
                            pdf.setDrawColor(200);
                            pdf.setLineWidth(0.02);
                            pdf.line(0.5, pageHeight - 0.75, pageWidth - 0.5, pageHeight - 0.75);
                            
                            try {
                                const logoDataUri = 'data:image/png;base64,${logoB64}';
                                pdf.addImage(logoDataUri, 'PNG', 0.5, pageHeight - 0.65, 1.6, 0.35);
                            } catch(e) { console.error("Logo Draw Error", e); }
                            
                            pdf.setTextColor(30, 64, 175);
                            pdf.textWithLink('brkthrucoaching.com', 2.3, pageHeight - 0.45, { url: 'https://brkthrucoaching.com' });
                            
                            pdf.setTextColor(100);
                            pdf.text('Page ' + i + ' of ' + totalPages, pageWidth - 0.5, pageHeight - 0.45, { align: 'right' });
                        }
                    }).save().then(() => {
                        element.classList.remove('pdf-rendering');
                        h1s.forEach(h1 => h1.classList.remove('no-pdf'));
                        if (brandedHeader.parentNode) brandedHeader.parentNode.removeChild(brandedHeader);
                        if (diagramContainer) {
                            diagramContainer.classList.remove('page-break-before');
                            if(svg) {
                                svg.style.display = originalSvgDisplay;
                            }
                            if(tempImg && tempImg.parentNode) {
                                diagramContainer.removeChild(tempImg);
                            }
                        }
                    });
                };

                if (tempImg) {
                    let hasExecuted = false;
                    tempImg.onload = function() {
                        if (!hasExecuted) {
                            hasExecuted = true;
                            executePdf();
                        }
                    };
                    // Race condition backup
                    setTimeout(function() {
                        if (!hasExecuted) {
                            hasExecuted = true;
                            executePdf();
                        }
                    }, 600);
                    // trigger loading
                    tempImg.src = 'data:image/svg+xml;base64,' + base64EncodedSVG;
                } else {
                    executePdf();
                }
            };`;

    console.log("Replacing PDF engine...");
    const engineRegex = /\/\/ \-\-\- 2\. PREMIUM PDF GENERATION ENGINE \-\-\-[\s\S]*?\/\/ \-\-\- 3\. DUAL-BACKEND SYNC WRAPPER \-\-\-/;
    content = content.replace(engineRegex, newEngine + '\n            // --- 3. DUAL-BACKEND SYNC WRAPPER ---');

    console.log(`Saving changes to ${filePath}...`);
    fs.writeFileSync(filePath, content, 'utf8');

    console.log("SUCCESS: Comprehensive patch applied (Node.js).");
} catch (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
}
