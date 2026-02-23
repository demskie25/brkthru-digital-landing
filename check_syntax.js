const fs = require('fs');
const html = fs.readFileSync('e:/brkthru-digital-landing/assessments.html', 'utf8');

// Extract all script tags
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let hasError = false;

while ((match = scriptRegex.exec(html)) !== null) {
    const scriptContent = match[1];
    if (scriptContent.trim() === '') continue;
    
    try {
        // Attempt to parse the JS
        new Function(scriptContent);
    } catch (e) {
        console.error("Syntax Error in script:", e.message);
        console.error("Snippet:", scriptContent.substring(0, 100) + '...');
        hasError = true;
    }
}

if (!hasError) {
    console.log("No syntax errors found in inline scripts!");
} else {
    process.exit(1);
}
