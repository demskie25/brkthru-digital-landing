const fs = require('fs');

// Read the clean header
const cleanHeader = fs.readFileSync('clean_header.html', 'utf8');

// Files to fix
const files = ['index.html', 'odyssey.html', 'corporate.html', 'coaching.html', 'resources.html', 'shop.html'];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if the proper navigation already exists
        if (content.includes('univ-nav')) {
            console.log(`${file}: Navigation already exists, skipping`);
            return;
        }
        
        // Find where to insert the header - after <body> tag
        const bodyMatch = content.match(/<body[^>]*>/i);
        if (bodyMatch) {
            const bodyIndex = content.indexOf(bodyMatch[0]) + bodyMatch[0].length;
            
            // Remove any existing broken header (logo only, no nav)
            // Look for the logo-only header pattern
            const logoOnlyPattern = /<a href="index\.html"[^>]*>\s*<img[^>]*brkthru-logo[^>]*>\s*<\/a>/gi;
            content = content.replace(logoOnlyPattern, '');
            
            // Insert the clean header after <body>
            content = content.slice(0, bodyIndex) + '\n' + cleanHeader + '\n' + content.slice(bodyIndex);
            
            fs.writeFileSync(file, content, 'utf8');
            console.log(`${file}: Fixed - added complete navigation header`);
        } else {
            console.log(`${file}: Could not find <body> tag`);
        }
    } catch (err) {
        console.log(`${file}: Error - ${err.message}`);
    }
});

console.log('\nDone! Now commit and push the changes.');
