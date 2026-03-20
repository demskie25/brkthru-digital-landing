const fs = require('fs');
const filePath = 'assessments.html';

try {
    let content = fs.readFileSync(filePath, 'utf16le');
    
    // The target string pattern to replace
    const targetPattern = /div:not\(\.bar-chart\):not\(\.bar-wrapper\) {/g;
    const replacement = "div:not(.bar-chart):not(.bar-wrapper):not(.bar) {";
    
    if (content.match(targetPattern)) {
        content = content.replace(targetPattern, replacement);
        fs.writeFileSync(filePath, content, 'utf16le');
        console.log('Successfully applied V69 fix.');
    } else if (content.includes(replacement)) {
        console.log('V69 fix is already applied.');
    } else {
        console.log('Target pattern not found. Could not apply V69 fix.');
    }
} catch (e) {
    console.error('Error applying fix:', e.message);
}
