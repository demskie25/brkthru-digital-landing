const fs = require('fs');

function fixHtmlEnd(filename) {
    if(!fs.existsSync(filename)) {
        console.log(`File ${filename} not found.`);
        return;
    }
    let content = fs.readFileSync(filename, 'utf8');
    
    // Sometimes there could be multiple </html>, we take the FIRST or LAST?
    // Let's use lastIndexOf.
    const htmlEndIndex = content.lastIndexOf('</html>');
    if(htmlEndIndex !== -1) {
        const afterHtml = content.substring(htmlEndIndex + 7).trim();
        if(afterHtml.length > 0 && afterHtml.includes('@media print')) {
            console.log(`Found trailing content in ${filename}, moving it to <head>...`);
            // Strip the trailing content out
            content = content.substring(0, htmlEndIndex + 7) + '\n';
            
            // Insert it before </head>
            const styleToInsert = '\n    <!-- V64 Surgical Graph Fix (Moved inside Head) -->\n    <style id="surgical-print-fix">\n' + afterHtml + '\n    </style>\n';
            content = content.replace('</head>', styleToInsert + '</head>');
            fs.writeFileSync(filename, content);
            console.log(`Fixed ${filename}`);
        } else {
            console.log(`${filename} tail is clean or does not contain @media print. Trailing length: ${afterHtml.length}`);
        }
    } else {
         console.log(`${filename} does not contain </html>.`);
    }
}

fixHtmlEnd('e:/brkthru-digital-landing/assessments.html');
fixHtmlEnd('e:/brkthru-digital-landing/start-enneagram.html');
