const fs = require('fs');

const files = ['odyssey.html', 'coaching.html', 'resources.html', 'shop.html'];

const cssLink = `  <link rel="stylesheet" href="responsive-global.css">`;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if already added
        if (content.includes('responsive-global.css')) {
            console.log(`${file}: Already has responsive CSS`);
            return;
        }
        
        // Add after universal-header.css using regex to handle variations
        const regex = /<link\s+rel="stylesheet"\s+href="universal-header\.css"\s*\/?>/i;
        if (regex.test(content)) {
            content = content.replace(regex, (match) => {
                return match + '\n' + cssLink;
            });
            fs.writeFileSync(file, content, 'utf8');
            console.log(`${file}: Added responsive CSS after universal-header.css`);
        } else {
            // Fallback: add before </head>
            content = content.replace('</head>', cssLink + '\n  </head>');
            fs.writeFileSync(file, content, 'utf8');
            console.log(`${file}: Added responsive CSS before </head>`);
        }
        
    } catch (err) {
        console.log(`${file}: Error - ${err.message}`);
    }
});

console.log('\nDone!');
