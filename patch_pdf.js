const fs = require('fs');

console.log("Applying emergency SVG and CSS printing fix to assessments.html...");

const assessmentsPath = 'assessments.html';
let content = fs.readFileSync(assessmentsPath, 'utf8');

// The issue is two-fold:
// 1. html2canvas drops the SVG entirely if it doesn't have explicit bounds.
// 2. The previous fix might not have matched the title correctly depending on DOM state.

const cssPatch = `
            /* PDF Branding Styles (V123 Fidelity Fix) */
            .pdf-only { display: none !important; }
            .pdf-rendering .pdf-only { display: block !important; }
            .pdf-rendering .no-pdf { display: none !important; }
            
            /* Professional Header applied via DOM */
            .pdf-header {
                text-align: center;
                font-size: 16px;
                color: #4A148C;
                margin-bottom: 25px;
                padding-bottom: 12px;
                border-bottom: 2px solid #e2e8f0;
                font-weight: bold;
            }

            /* Prevention of premature cuts */
            .pdf-rendering .report-card { 
                page-break-inside: avoid !important; 
                margin-bottom: 40px !important;
                display: block !important; 
            }
            .pdf-rendering h1, .pdf-rendering h2, .pdf-rendering h3 { 
                page-break-after: avoid !important; 
                page-break-inside: avoid !important;
            }
            .pdf-rendering .graph-container {
                page-break-inside: avoid !important;
            }
            
            /* Explicit Page Breaks */
            .page-break-before {
                page-break-before: always !important;
                clear: both;
            }

            /* Map Enlarge - FIX for html2canvas SVG dropping */
            .pdf-rendering #movedSectionsContainer {
                 page-break-before: always !important;
            }
            .pdf-rendering .circular-diagram-container {
                page-break-before: always !important;
                padding-top: 60px !important;
                padding-bottom: 60px !important;
                display: block !important; /* Flex breaks html2canvas sometimes */
                text-align: center;
                width: 100% !important;
            }
            .pdf-rendering #enneagramCircleSvg {
                width: 600px !important; /* EXPLICIT PIXEL WIDTH FOR HTML2CANVAS */
                height: 600px !important; /* EXPLICIT PIXEL HEIGHT FOR HTML2CANVAS */
                max-width: none !important;
                margin: 0 auto !important;
                display: inline-block;
            }
            /* Explicit styles for SVG text to render in canvas */
            .pdf-rendering .enneagram-node-text {
                font-family: sans-serif !important;
                font-size: 16px !important;
                fill: #fff !important;
            }
            .pdf-rendering .wing-indicator-text {
                font-family: sans-serif !important;
                font-size: 12px !important;
                fill: #64748B !important;
            }
`;

if (content.includes("/* PDF Branding Styles")) {
    content = content.replace(/\/\* PDF Branding Styles[\s\S]*?(?=<\/style>)/, cssPatch);
} else {
    content = content.replace('</style>', cssPatch + '\n</style>');
}


// Fix SVG generation to include width/height attrs directly and fix the PDF generation logic
const pdfLogicPatch = `// --- 2. PREMIUM PDF GENERATION ENGINE ---
            window.generatePDF = function() {
                const element = document.getElementById('pdfContentArea');
                const userName = (participantData && participantData.firstName) ? (participantData.firstName + ' ' + participantData.familyName) : 'Leader';
                
                // Activate Rendering Mode
                element.classList.add('pdf-rendering');

                // DYNAMIC DOM MODIFICATIONS FOR PDF:
                
                // 1. Hide ALL giant H1 titles generically within the content area to be safe
                const h1s = element.querySelectorAll('h1');
                h1s.forEach(h1 => h1.classList.add('no-pdf'));

                // 2. Insert Professional Header
                const brandedHeader = document.createElement('div');
                brandedHeader.className = 'pdf-only pdf-header';
                brandedHeader.innerHTML = '<strong>Full Enneagram Assessment Report</strong><br>Prepared for: ' + userName + ' | Brkthru Digital V123';
                element.insertBefore(brandedHeader, element.firstChild);

                // 3. Fix Page Breaks
                const typeResult = document.getElementById('typeResult');
                if (typeResult) typeResult.classList.add('page-break-before', 'report-card');
                
                const diagramContainer = document.querySelector('.circular-diagram-container');
                let diagTitle = null;
                if (diagramContainer) {
                    diagramContainer.classList.add('page-break-before');
                    
                    // Add Title
                    diagTitle = document.createElement('h2');
                    diagTitle.className = 'pdf-only text-4xl font-black text-center mb-12';
                    diagTitle.style.color = '#4A148C';
                    diagTitle.innerText = "Interconnected Type Map";
                    diagramContainer.insertBefore(diagTitle, diagramContainer.firstChild);
                    
                    // CRITICAL FIX FOR HTML2CANVAS SVG BLANKING:
                    // Force the SVG to have explicit pixel dimensions and viewBox right before render
                    const svg = document.getElementById('enneagramCircleSvg');
                    if(svg) {
                        svg.setAttribute('width', '600');
                        svg.setAttribute('height', '600');
                        svg.setAttribute('viewBox', '0 0 320 320'); // The original coords used cx=160 cy=160 r=100
                    }
                }

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
                        scrollY: 0,
                        foreignObjectRendering: false // sometimes SVG fails with this
                    },
                    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
                    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
                };

                let worker = html2pdf().set(opt).from(element);
                worker.toPdf().get('pdf').then(function(pdf) {
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
                }).then(function() {
                    worker.save().then(() => {
                        element.classList.remove('pdf-rendering');
                        h1s.forEach(h1 => h1.classList.remove('no-pdf')); // Restore all H1s
                        if (brandedHeader.parentNode) brandedHeader.parentNode.removeChild(brandedHeader);
                        if (diagramContainer && diagTitle) {
                            diagramContainer.classList.remove('page-break-before');
                            diagramContainer.removeChild(diagTitle);
                            // Cleanup SVG explicit attrs
                            const svg = document.getElementById('enneagramCircleSvg');
                            if(svg) {
                                svg.removeAttribute('width');
                                svg.removeAttribute('height');
                            }
                        }
                    });
                });
            };
`;

content = content.replace(/\/\/ \-\-\- 2\. PREMIUM PDF GENERATION ENGINE \-\-\-[\s\S]*?(?=\/\/ \-\-\- 3\. DUAL-BACKEND SYNC WRAPPER \-\-\-)/, pdfLogicPatch);

// Ensure the viewBox is baked into the SVG creation string just in case
const svgCreationPatch = `circularDiagramSvg.innerHTML = '';
            circularDiagramSvg.setAttribute('viewBox', '0 0 320 320'); // CRITICAL FOR PDF SCALING
            const cx = 160, cy = 160`;
content = content.replace(/circularDiagramSvg\.innerHTML = '';\s*const cx = 160, cy = 160/, svgCreationPatch);

fs.writeFileSync(assessmentsPath, content, 'utf8');
fs.writeFileSync('start-enneagram.html', content, 'utf8');

console.log("SVG Canvas patch applied to assessments.html");
