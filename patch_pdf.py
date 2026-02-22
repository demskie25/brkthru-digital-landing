import os
import re

print("Starting deep patch of assessments.html for perfect V123 PDF Layout...")

assessments_path = 'assessments.html'

with open(assessments_path, 'r', encoding='utf8') as f:
    content = f.read()

# 1. CSS Patches: Modify the giant H1 title to be dynamically hidden or changed during PDF render.
css_patch = """
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

            /* Map Enlarge */
            .pdf-rendering #movedSectionsContainer {
                 page-break-before: always !important;
            }
            .pdf-rendering .circular-diagram-container {
                page-break-before: always !important;
                padding-top: 60px !important;
                padding-bottom: 60px !important;
                display: flex !important;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100% !important;
            }
            .pdf-rendering #enneagramCircleSvg {
                width: 100% !important;
                max-width: 650px !important;
                margin: 0 auto !important;
                transform: scale(1.15) !important;
                transform-origin: center center !important;
            }
"""

if "/* PDF Branding Styles" in content:
    content = re.sub(r'/\* PDF Branding Styles.*?(?=</style>)', css_patch, content, flags=re.DOTALL)
else:
    # Append to existing styles
    content = content.replace('</style>', css_patch + '\n</style>', 1)


# 2. Fix jsPDF Data URI and PDF generation logic.
pdf_logic_patch = """// --- 2. PREMIUM PDF GENERATION ENGINE ---
            window.generatePDF = function() {
                const element = document.getElementById('pdfContentArea');
                const userName = (participantData && participantData.firstName) ? (participantData.firstName + ' ' + participantData.familyName) : 'Leader';
                
                // Activate Rendering Mode
                element.classList.add('pdf-rendering');

                // DYNAMIC DOM MODIFICATIONS FOR PDF:
                // Hide the giant "Full Leadership Intelligence Report" string 
                const origTitle = element.querySelector('h1.text-5xl');
                if (origTitle) origTitle.classList.add('no-pdf');

                const brandedHeader = document.createElement('div');
                brandedHeader.className = 'pdf-only pdf-header';
                brandedHeader.innerHTML = `<strong>Full Enneagram Assessment Report</strong><br>Prepared for: ${userName} | Brkthru Digital V123`;
                element.insertBefore(brandedHeader, element.firstChild);

                // Add explicit page breaks before critical headers to prevent cuts
                const typeResult = document.getElementById('typeResult');
                if (typeResult) typeResult.classList.add('page-break-before', 'report-card');
                
                const diagramContainer = document.querySelector('.circular-diagram-container');
                let diagTitle = null;
                if (diagramContainer) {
                    diagramContainer.classList.add('page-break-before');
                    // Add a title above the diagram
                    diagTitle = document.createElement('h2');
                    diagTitle.className = 'pdf-only text-4xl font-black text-center mb-12';
                    diagTitle.style.color = '#4A148C';
                    diagTitle.innerText = "Interconnected Type Map";
                    diagramContainer.insertBefore(diagTitle, diagramContainer.firstChild);
                }

                // Bar cut fix: wrap bar chart in a page-break-inside avoid container
                const resultsSectionItems = document.querySelectorAll('.report-card');
                resultsSectionItems.forEach(el => el.classList.add('html2pdf__page-break-avoid'));

                const opt = {
                    margin:       [0.5, 0.5, 1.0, 0.5], // Top, Left, Bottom, Right
                    filename:     'Enneagram_Report_' + userName.replace(/\s+/g, '_') + '.pdf',
                    image:        { type: 'jpeg', quality: 0.98 },
                    html2canvas:  { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
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
                        
                        // Footer Line
                        pdf.setDrawColor(200);
                        pdf.setLineWidth(0.02);
                        pdf.line(0.5, pageHeight - 0.75, pageWidth - 0.5, pageHeight - 0.75);
                        
                        // Footer: Logo (Manual Draw)
                        try {
                            const logoDataUri = 'data:image/png;base64,' + BRKTHRU_LOGO_B64;
                            pdf.addImage(logoDataUri, 'PNG', 0.5, pageHeight - 0.65, 1.2, 0.4);
                        } catch(e) { console.error("Logo Draw Error", e); }
                        
                        // Footer: Link
                        pdf.setTextColor(30, 64, 175);
                        pdf.textWithLink('brkthrucoaching.com', 1.8, pageHeight - 0.45, { url: 'https://brkthrucoaching.com' });
                        
                        // Footer: Page Numbers
                        pdf.setTextColor(100);
                        pdf.text('Page ' + i + ' of ' + totalPages, pageWidth - 0.5, pageHeight - 0.45, { align: 'right' });
                    }
                }).then(function() {
                    // MUST delay cleanup until save gets called or resolves,
                    // but we can just use the internal worker then()
                    worker.save().then(() => {
                        element.classList.remove('pdf-rendering');
                        if (origTitle) origTitle.classList.remove('no-pdf');
                        if (brandedHeader.parentNode) brandedHeader.parentNode.removeChild(brandedHeader);
                        if (diagramContainer && diagTitle) {
                            diagramContainer.classList.remove('page-break-before');
                            diagramContainer.removeChild(diagTitle);
                        }
                    });
                });
            };
"""

# Replace the old generatePDF implementation. We need to match from // --- 2. PREMIUM PDF GENERATION ENGINE --- to // --- 3. DUAL-BACKEND SYNC WRAPPER ---
content = re.sub(r'// \-\-\- 2\. PREMIUM PDF GENERATION ENGINE \-\-\-.*?(?=// \-\-\- 3\. DUAL-BACKEND SYNC WRAPPER \-\-\-)', pdf_logic_patch, content, flags=re.DOTALL)

with open(assessments_path, 'w', encoding='utf8') as f:
    f.write(content)

print("Patch applied to assessments.html")
