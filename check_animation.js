const fs = require('fs');

// Check resources.html for animation
const resources = fs.readFileSync('resources.html', 'utf8');

// Find animation-related CSS or classes
const animationMatches = resources.match(/(@keyframes|animation:|\.animate|fade-in|slide)/gi);
console.log('Animation keywords found:', animationMatches ? animationMatches.length : 0);

// Find the title/hero section
const lines = resources.split('\n');
let inStyle = false;
let styleContent = '';

lines.forEach((line, i) => {
    if (line.includes('<style')) inStyle = true;
    if (inStyle) styleContent += line + '\n';
    if (line.includes('</style>')) inStyle = false;
    
    // Find h1 or hero titles
    if (line.includes('<h1') || line.includes('hero') || line.includes('page-title')) {
        console.log(`Line ${i+1}: ${line.substring(0, 120)}`);
    }
});

// Output style section to file for inspection
fs.writeFileSync('resources_style.txt', styleContent);
console.log('\nStyle content written to resources_style.txt');
