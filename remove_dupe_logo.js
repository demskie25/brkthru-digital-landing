const fs = require('fs');

const files = ['index.html', 'odyssey.html', 'corporate.html', 'coaching.html', 'resources.html', 'shop.html'];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Find and remove the duplicate standalone logo that appears after the header
        // Look for logo img outside of the nav header
        
        // Pattern: standalone logo link after the header spacer
        // This catches: <a href="index.html"...><img...brkthru-logo...></a>
        const patterns = [
            // Standalone logo link without the nav context
            /<a\s+href="index\.html"[^>]*>\s*<img[^>]*brkthru-logo[^>]*>\s*<\/a>\s*(?!<span)/gi,
            // Just the image if it's standalone
            /<img[^>]*class="[^"]*univ-logo-img[^"]*"[^>]*>\s*(?!<span)/gi,
        ];
        
        // Count occurrences of the logo
        const logoMatches = content.match(/<img[^>]*brkthru-logo[^>]*>/gi) || [];
        console.log(`${file}: Found ${logoMatches.length} logo images`);
        
        if (logoMatches.length > 1) {
            // There's a duplicate - we need to remove the one that's NOT in the nav header
            // The proper one is inside: <a href="index.html" class="univ-logo">
            
            // Find the end of the proper header (after univ-spacer)
            const spacerEnd = content.indexOf('<!-- END UNIVERSAL HEADER -->');
            
            if (spacerEnd > -1) {
                // Look for any logo after the header and remove it
                const afterHeader = content.substring(spacerEnd);
                const beforeHeader = content.substring(0, spacerEnd);
                
                // Remove standalone logo links after header
                let cleanedAfter = afterHeader.replace(/<a\s+href="index\.html"[^>]*>\s*<img[^>]*brkthru-logo[^>]*>\s*<\/a>/gi, '');
                
                content = beforeHeader + cleanedAfter;
                fs.writeFileSync(file, content, 'utf8');
                console.log(`${file}: Removed duplicate logo`);
            } else {
                console.log(`${file}: Could not find header end marker`);
            }
        } else {
            console.log(`${file}: Only 1 logo, no duplicates to remove`);
        }
    } catch (err) {
        console.log(`${file}: Error - ${err.message}`);
    }
});

console.log('\nDone! Commit and push.');
