
const fs = require('fs');

const filePath = 'assessments.html';

try {
    const content = fs.readFileSync(filePath, 'utf8');
    const startMarker = 'window.generatePDF = function() {';
    const endMarker = 'async function sendResultsToBackend';
    
    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker);
    
    if (startIdx === -1) {
        console.log("Start marker not found");
    } else {
        console.log(`Start marker found at ${startIdx}`);
    }
    
    if (endIdx === -1) {
        console.log("End marker not found");
    } else {
        console.log(`End marker found at ${endIdx}`);
    }
    
    if (startIdx !== -1 && endIdx !== -1) {
        const block = content.substring(startIdx, endIdx);
        fs.writeFileSync('block_to_replace.txt', block);
        console.log("Block saved to block_to_replace.txt");
    }
} catch (err) {
    console.error(err);
}
