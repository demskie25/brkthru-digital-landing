const fs = require('fs');

const path = 'assessments.html';

const buttonHtml = `
<button id="saveImageButton" onclick="saveAsImage()" style="background:#4b0082; color:#FFD700; padding:20px; width:100%; border-radius:10px; font-weight:bold; margin-top:30px;">SAVE REPORT TO PHONE (PNG)</button>
`;

try {
    let content = fs.readFileSync(path, 'utf8');
    
    // 1. Remove the "wall of code" starting with 'function displayCircularDiagram'
    // We'll search for this string and remove everything from its first occurrence 
    // down to a closing script tag if it exists in that block, or just the block itself.
    if (content.includes('function displayCircularDiagram')) {
        const startIdx = content.indexOf('function displayCircularDiagram');
        // We'll search for the next closing script tag or just remove a large block
        const endIdx = content.indexOf('</script>', startIdx);
        if (endIdx !== -1) {
            content = content.substring(0, startIdx) + content.substring(endIdx);
            console.log('Removed code wall starting at displayCircularDiagram.');
        } else {
            console.log('Found function but no closing script tag in its block.');
        }
    } else {
        console.log('Could not find displayCircularDiagram.');
    }

    // 2. Insert the specific button right before the script tags at the bottom.
    // We'll look for the first script tag after the results container.
    // The user mentioned line 2326, which is near the end.
    if (content.includes('<script')) {
        const lastScriptIndex = content.lastIndexOf('<script');
        content = content.substring(0, lastScriptIndex) + buttonHtml + '\n' + content.substring(lastScriptIndex);
        console.log('Inserted saveImageButton.');
    } else {
        console.log('Could not find script tags at the bottom.');
    }

    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully applied cleanup and inserted button.');

} catch (e) {
    console.error('Error during cleanup:', e.message);
    process.exit(1);
}
