
const fs = require('fs');

const filePath = 'assessments.html';
const startMarker = 'window.generatePDF = function() {';
const endMarker = 'async function sendResultsToBackend';

const newCode = `function generatePDF() {
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

                    html2pdf().set(opt).from(element).outputPdf('blob').then(function(pdfBlob) {
                        // 1. Trigger the normal PDF download for the user
                        const url = URL.createObjectURL(pdfBlob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'Enneagram-Report.pdf';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        
                        // 2. Find the user's email (ID: email)
                        const userEmailField = document.getElementById('email');
                        const userEmail = userEmailField && userEmailField.value ? userEmailField.value : 'no-reply@brkthru.com';
                        
                        // 3. Convert PDF to Base64 and send via EmailJS
                        const reader = new FileReader();
                        reader.readAsDataURL(pdfBlob);
                        reader.onloadend = function() {
                            const base64data = reader.result.split(',')[1];
                            const templateParams = {
                                to_email: userEmail,
                                attachment: base64data
                            };

                            emailjs.send('service_c2k8v3l', 'template_enneagram_resul', templateParams)
                                .then(function(response) {
                                    console.log("Email sent successfully via EmailJS!", response.status, response.text);
                                }, function(error) {
                                    console.error("EmailJS failed to send", error);
                                });
                        };
                        
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
                    }, 1000);
                } else {
                    executePdf();
                }
            };

            `;

try {
    let content = fs.readFileSync(filePath, 'utf8');
    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker);
    
    if (startIdx === -1 || endIdx === -1) {
        throw new Error("Markers not found");
    }
    
    const updatedContent = content.substring(0, startIdx) + newCode + content.substring(endIdx);
    fs.writeFileSync(filePath, updatedContent);
    console.log("File updated successfully.");
} catch (err) {
    console.error("Error updating file:", err.message);
    process.exit(1);
}
