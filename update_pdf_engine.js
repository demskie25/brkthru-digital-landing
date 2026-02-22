const fs = require('fs');

console.log("Applying fixes to assessments.html PDF engine...");

// Read the old assessments.html
let html = fs.readFileSync('assessments.html', 'utf8');

// Read brkthru-logo2.png and convert to Base64
let logoBuf = fs.readFileSync('brkthru-logo2.png');
let logoB64 = logoBuf.toString('base64');

// Replace the logo string
html = html.replace(/const BRKTHRU_LOGO_B64 = "([^"]+)";/g, `const BRKTHRU_LOGO_B64 = "${logoB64}";`);

// Update the generatePDF function to use Promises to wait for SVG image to load!
// We will replace the entire window.generatePDF function with a robust one

const newPDFLogic = `// --- 2. PREMIUM PDF GENERATION ENGINE ---
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
                brandedHeader.innerHTML = '<strong>Full Enneagram Assessment Report</strong><br>Prepared for: ' + userName + ' | Brkthru Digital V124';
                element.insertBefore(brandedHeader, element.firstChild);

                // Fix Page Breaks
                const typeResult = document.getElementById('typeResult');
                if (typeResult) typeResult.classList.add('page-break-before', 'report-card');
                
                const diagramContainer = document.querySelector('.circular-diagram-container');
                let diagTitle = null;
                let originalSvgDisplay = '';
                let tempImg = null;
                const svg = document.getElementById('enneagramCircleSvg');
                
                let svgPromise = Promise.resolve();

                if (diagramContainer) {
                    diagramContainer.classList.add('page-break-before');
                    
                    // Add Title
                    diagTitle = document.createElement('h2');
                    diagTitle.className = 'pdf-only text-4xl font-black text-center mb-12';
                    diagTitle.style.color = '#4A148C';
                    diagTitle.innerText = "Interconnected Type Map";
                    diagramContainer.insertBefore(diagTitle, diagramContainer.firstChild);
                    
                    if(svg) {
                        svgPromise = new Promise((resolve) => {
                            // First, force proper namespaces and styles so the serialized version is self-contained
                            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                            
                            // Bake the specific CSS into the SVG before serialization so it renders standalone
                            const styleSheet = document.createElementNS("http://www.w3.org/2000/svg", "style");
                            styleSheet.textContent = \\\`
                                .enneagram-outer-path { stroke: #B8860B; stroke-width: 3.0; fill: none; }
                                .enneagram-inner-line { stroke: #FFD700; stroke-width: 2.0; opacity: 0.8; fill: none; }
                                .enneagram-node-circle.other-type { fill: #FFF8DC; stroke: #000080; stroke-width: 2; }
                                .enneagram-node-circle.primary-type { fill: #FFD700; stroke: #B8860B; stroke-width: 3; }
                                .enneagram-node-circle.wing-type { fill: #9ACD32; stroke: #B8860B; stroke-width: 2; }
                                .enneagram-node-text { font-family: sans-serif; font-size: 16px; fill: #fff; font-weight: bold; }
                                .enneagram-node-text.other-type { fill: #000080; }
                                .wing-indicator-text { font-size: 10px; font-weight: bold; fill: #4A148C; text-anchor: middle; font-family: sans-serif; }
                            \\\`;
                            svg.insertBefore(styleSheet, svg.firstChild);

                            // Serialize to string
                            const serializer = new XMLSerializer();
                            let source = serializer.serializeToString(svg);
                            
                            // Add XML declaration
                            if(!source.match(/^<\\\\?xml/)){
                                source = '<?xml version="1.0" standalone="no"?>\\r\\n' + source;
                            }

                            // Convert to Base64
                            const base64EncodedSVG = btoa(unescape(encodeURIComponent(source)));
                            
                            // Create replacement Image
                            tempImg = document.createElement('img');
                            // Use loaded event!
                            tempImg.onload = function() {
                                resolve();
                            };
                            tempImg.onerror = function() {
                                console.error("Error loading SVG data URI");
                                resolve(); // continue anyway
                            };
                            tempImg.src = 'data:image/svg+xml;base64,' + base64EncodedSVG;
                            tempImg.style.width = '600px';
                            tempImg.style.height = '600px';
                            tempImg.style.display = 'block';
                            tempImg.style.margin = '0 auto';
                            
                            // Swap them
                            originalSvgDisplay = svg.style.display;
                            svg.style.display = 'none';
                            diagramContainer.insertBefore(tempImg, svg);
                            
                            // Clean up the stylesheet from the original SVG
                            svg.removeChild(styleSheet);
                        });
                    }
                }

                svgPromise.then(() => {
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
                                const logoDataUri = 'data:image/png;base64,' + BRKTHRU_LOGO_B64;
                                pdf.addImage(logoDataUri, 'PNG', 0.5, pageHeight - 0.65, 1.2, 0.4);
                            } catch(e) { console.error("Logo Draw Error", e); }
                            
                            pdf.setTextColor(30, 64, 175);
                            pdf.textWithLink('brkthrucoaching.com', 1.8, pageHeight - 0.45, { url: 'https://brkthrucoaching.com' });
                            
                            pdf.setTextColor(100);
                            pdf.text('Page ' + i + ' of ' + totalPages, pageWidth - 0.5, pageHeight - 0.45, { align: 'right' });
                        }
                    }).save().then(() => {
                        element.classList.remove('pdf-rendering');
                        h1s.forEach(h1 => h1.classList.remove('no-pdf')); // Restore all H1s
                        if (brandedHeader.parentNode) brandedHeader.parentNode.removeChild(brandedHeader);
                        if (diagramContainer) {
                            diagramContainer.classList.remove('page-break-before');
                            if(diagTitle && diagTitle.parentNode) diagramContainer.removeChild(diagTitle);
                            if(svg) {
                                svg.style.display = originalSvgDisplay; // show real svg again
                            }
                            if(tempImg && tempImg.parentNode) {
                                diagramContainer.removeChild(tempImg); // remove static image
                            }
                        }
                    });
                });
            };`;

html = html.replace(/\/\/ \-\-\- 2\. PREMIUM PDF GENERATION ENGINE \-\-\-[\s\S]*?(?=\/\/ \-\-\- 3\. DUAL-BACKEND SYNC WRAPPER \-\-\-)/, newPDFLogic);

fs.writeFileSync('assessments.html', html, 'utf8');
fs.writeFileSync('start-enneagram.html', html, 'utf8');

console.log("PDF Engine updated, base64 logo applied.");
