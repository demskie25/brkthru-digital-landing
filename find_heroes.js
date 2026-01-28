const fs = require('fs');

// Find hero/title sections in each file
const files = ['index.html', 'odyssey.html', 'corporate.html', 'coaching.html'];

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    
    console.log(`\n=== ${file} ===`);
    
    lines.forEach((line, i) => {
        // Look for h1 tags and hero sections
        if (line.includes('<h1') || line.includes('hero') || line.includes('Hero')) {
            console.log(`Line ${i+1}: ${line.substring(0, 100).trim()}`);
        }
    });
});
