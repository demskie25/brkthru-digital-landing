
const fs = require('fs');
const path = require('path');

const filePath = 'assessments.html';
const keywords = ['generatePDF', 'html2pdf', 'emailjs'];

try {
    const content = fs.readFileSync(filePath, 'utf8');
    let results = [];
    
    keywords.forEach(kw => {
        let idx = -1;
        while ((idx = content.indexOf(kw, idx + 1)) !== -1) {
            const start = Math.max(0, idx - 500);
            const end = Math.min(content.length, idx + 2000);
            results.push(`--- Match for ${kw} at ${idx} ---`);
            results.push(content.substring(start, end));
            results.push('-'.repeat(80));
        }
    });
    
    fs.writeFileSync('snippet_results_node.txt', results.join('\n'));
    console.log(`Extraction complete. Found ${results.length / 3} snippets.`);
} catch (err) {
    fs.writeFileSync('snippet_error_node.txt', err.stack);
    console.error(err);
}
