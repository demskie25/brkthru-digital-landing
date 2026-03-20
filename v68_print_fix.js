const fs = require('fs');
const path = require('path');

const fileNames = ['assessments.html'];
const cssToInject = `
    <style id="v68-surgical-graph-fix" type="text/css">
        @media print {
            .backdoor-indicator {
                display: none !important;
            }
            .bar, .primary-type-bar {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                /* Fallback solid colors if gradients fail */
                background-color: #000080 !important;
            }
            .primary-type-bar {
                background-color: #008080 !important;
            }
            
            /* Spacing adjustments to prevent empty white gaps */
            .report-card, .chart-container, .circular-diagram-container {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
            }
            #resultsSection {
                padding-top: 0 !important;
                margin-top: 0 !important;
            }
        }
    </style>
`;

fileNames.forEach(fileName => {
    let content = fs.readFileSync(fileName, 'utf16le'); // Handling the specific encoding
    
    // Check if we've already injected
    if (!content.includes('id="v68-surgical-graph-fix"')) {
        // Appending to the head
        content = content.replace('</head>', cssToInject + '\n</head>');
        fs.writeFileSync(fileName, content, 'utf16le');
        console.log(\`Successfully injected V68 CSS into \${fileName}\`);
    } else {
         console.log(\`V68 CSS already exists in \${fileName}\`);
    }
});
