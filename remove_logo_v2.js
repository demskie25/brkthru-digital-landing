const fs = require('fs');

// Specific lines to remove the standalone logo (the second occurrence in each file)
const fixes = {
    'index.html': 185,
    'odyssey.html': 140,
    'corporate.html': 184,
    'coaching.html': 133,
    'resources.html': 112,
    'shop.html': 115
};

Object.entries(fixes).forEach(([file, lineNum]) => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');
        
        // Check if line contains the logo
        if (lines[lineNum - 1] && lines[lineNum - 1].includes('brkthru-logo')) {
            console.log(`${file}: Removing standalone logo at line ${lineNum}`);
            
            // Remove that line
            lines.splice(lineNum - 1, 1);
            
            fs.writeFileSync(file, lines.join('\n'), 'utf8');
            console.log(`${file}: Done`);
        } else {
            console.log(`${file}: Logo not found at line ${lineNum}, checking nearby...`);
            // Find the second occurrence
            let count = 0;
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes('brkthru-logo') && lines[i].includes('univ-logo-img')) {
                    count++;
                    if (count === 2) {
                        console.log(`${file}: Found second logo at line ${i + 1}, removing`);
                        lines.splice(i, 1);
                        fs.writeFileSync(file, lines.join('\n'), 'utf8');
                        break;
                    }
                }
            }
        }
    } catch (err) {
        console.log(`${file}: Error - ${err.message}`);
    }
});

console.log('\nDone!');
