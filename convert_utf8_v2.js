const fs = require('fs');
let b = fs.readFileSync('e:/brkthru-digital-landing/assessments.html');
// Try parsing as utf8 and see if it looks like garbage
let utf8str = b.toString('utf8');
if (utf8str.includes('\0')) {
    console.log("File contains null bytes, definitely UTF-16LE. Converting...");
    let str = b.toString('utf16le');
    fs.writeFileSync('e:/brkthru-digital-landing/assessments.html', str, 'utf8');
    console.log("Converted.");
} else {
    console.log("No null bytes found. It's likely UTF-8.");
}
