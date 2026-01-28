const fs = require('fs');

const files = ['index.html', 'odyssey.html', 'corporate.html', 'coaching.html', 'resources.html', 'shop.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find the line numbers with logo
    const lines = content.split('\n');
    lines.forEach((line, i) => {
        if (line.includes('brkthru-logo')) {
            console.log(`${file} line ${i+1}: ${line.substring(0, 100)}...`);
        }
    });
});
