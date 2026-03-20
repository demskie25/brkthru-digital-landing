const fs = require('fs');

const fileNames = ['assessments.html'];
const cssToInject = `
    <!-- V68 SURGICAL GRAPH AND BAR FIX -->
    <style id="v68-surgical-graph-fix" type="text/css">
        @media print {
            .backdoor-indicator {
                display: none !important;
            }
            .bar, .primary-type-bar {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                background-color: #000080 !important;
            }
            .primary-type-bar {
                background-color: #008080 !important;
            }
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
    try {
        let content = fs.readFileSync(fileName, 'utf8');
        
        if (!content.includes('id="v68-surgical-graph-fix"')) {
            content = content.replace('</head>', cssToInject + '\n</head>');
            fs.writeFileSync(fileName, content, 'utf8');
            console.log(\`Successfully injected V68 CSS into \${fileName}\`);
        } else {
             console.log(\`V68 CSS already exists in \${fileName}\`);
        }
    } catch (e) {
        console.error(\`Failed processing \${fileName}:\`, e.message);
    }
});
