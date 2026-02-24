
const fs = require('fs');

const filePath = 'assessments.html';

// 1. Logic Replacement
const startMarker = 'function generatePDF() {';
const endMarker = 'async function sendResultsToBackend';

const newCode = `async function sendSilentEmail(pdfBase64) {
                console.log("V129: Sending report via FormSubmit AJAX...");
                const formData = new FormData();
                formData.append('email', document.getElementById('email').value || 'no-reply@brkthru.com');
                formData.append('message', 'Attached is your Enneagram Assessment Report.');
                formData.append('attachment_base64', pdfBase64); 
                formData.append('_subject', 'Your Enneagram Report');
                formData.append('_captcha', 'false');

                try {
                    await fetch('https://formsubmit.co/ajax/brkthru.consulting@gmail.com', {
                        method: 'POST',
                        body: formData
                    });
                    console.log("V129: Email sent successfully.");
                } catch (e) {
                    console.error("V129: FormSubmit error:", e);
                }
            }

            window.downloadReportAndEmail = function() {
                const btn = document.querySelector('button[onclick*="downloadReportAndEmail"]');
                if (btn) {
                    btn.disabled = true;
                    btn.innerText = "Generating...";
                }

                const element = document.getElementById('pdfContentArea');
                const userName = (participantData && participantData.firstName) ? (participantData.firstName + ' ' + participantData.familyName) : 'Leader';
                
                // Activate Rendering Mode
                element.classList.add('pdf-rendering');

                // Hide ALL giant H1 titles 
                const h1s = element.querySelectorAll('h1');
                h1s.forEach(h1 => h1.classList.add('no-pdf'));

                // Insert Professional Header
                const brandedHeader = document.createElement('div');
                brandedHeader.className = 'pdf-only pdf-header';
                brandedHeader.innerHTML = '<strong>Full Enneagram Assessment Report</strong><br>Prepared for: ' + userName + ' | Brkthru Digital V129';
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
                        const serializer = new XMLSerializer();
                        let source = serializer.serializeToString(svg);
                        if(!source.match(/^<\\?\\xml/)){
                            source = '<?xml version="1.0" standalone="no"?>\\r\\n' + source;
                        }
                        const base64EncodedSVG = btoa(unescape(encodeURIComponent(source)));
                        tempImg = document.createElement('img');
                        tempImg.id = 'tempPdfImage';
                        tempImg.style.width = '600px';
                        tempImg.style.height = '600px';
                        tempImg.style.display = 'block';
                        tempImg.style.margin = '0 auto';
                        tempImg.src = 'data:image/svg+xml;base64,' + base64EncodedSVG;
                        originalSvgDisplay = svg.style.display;
                        svg.style.display = 'none';
                        diagramContainer.insertBefore(tempImg, svg);
                    }
                }

                const executePdf = function() {
                    console.log("V129: PDF Generation Initiated...");
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

                    html2pdf().set(opt).from(element).outputPdf('blob').then(function(pdfBlob) {
                        // 1. Download
                        const url = URL.createObjectURL(pdfBlob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = opt.filename;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        
                        // 2. Email (FormSubmit)
                        const reader = new FileReader();
                        reader.readAsDataURL(pdfBlob);
                        reader.onloadend = function() {
                            const base64data = reader.result.split(',')[1];
                            sendSilentEmail(base64data);
                            
                            // UI Cleanup
                            element.classList.remove('pdf-rendering');
                            h1s.forEach(h1 => h1.classList.remove('no-pdf'));
                            if (brandedHeader.parentNode) brandedHeader.parentNode.removeChild(brandedHeader);
                            if (diagramContainer) {
                                diagramContainer.classList.remove('page-break-before');
                                if(svg) svg.style.display = originalSvgDisplay;
                                if(tempImg && tempImg.parentNode) diagramContainer.removeChild(tempImg);
                            }
                            if (btn) {
                                btn.disabled = false;
                                btn.innerText = "Download PDF Report";
                            }
                        };
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
                    setTimeout(() => { if (!hasExecuted) { hasExecuted = true; executePdf(); } }, 2000);
                } else {
                    executePdf();
                }
            };

            `;

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Step 1: Update Function
    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker);
    if (startIdx === -1 || endIdx === -1) throw new Error("Markers not found");

    let updatedContent = content.substring(0, startIdx) + newCode + content.substring(endIdx);

    // Step 2: Update Button
    const oldButton = 'onclick="generatePDF()"';
    const newButton = 'onclick="downloadReportAndEmail()"';
    updatedContent = updatedContent.replace(oldButton, newButton);

    fs.writeFileSync(filePath, updatedContent);
    console.log("File updated successfully (Function replaced, Button updated).");
} catch (err) {
    console.error("Error updating file:", err.message);
    process.exit(1);
}
