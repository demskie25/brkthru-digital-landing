const fs = require('fs');
let b = fs.readFileSync('e:/brkthru-digital-landing/assessments.html');

// Check if UTF-16LE BOM or null bytes presence (simple heuristic)
let isUtf16 = b[0] === 0xff && b[1] === 0xfe || b[1] === 0x00;

if (isUtf16) {
    console.log("File is UTF-16. Converting to UTF-8.");
    let str = b.toString('utf16le');
    fs.writeFileSync('e:/brkthru-digital-landing/assessments.html', str, 'utf8');
} else {
    console.log("File is already UTF-8 or other. Re-saving as UTF-8 just in case.");
    let str = b.toString('utf8');
    fs.writeFileSync('e:/brkthru-digital-landing/assessments.html', str, 'utf8');
}
