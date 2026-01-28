const fs = require('fs');

// Add data-aos attributes to hero elements in each file
const files = ['index.html', 'odyssey.html', 'corporate.html', 'coaching.html'];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // Find and add animation to the tag line (small text above h1)
        // Pattern: tracking-[0.6em] or similar small caps text
        if (content.includes('tracking-[0.6em]') || content.includes('tracking-[0.5em]') || content.includes('tracking-[0.4em]')) {
            // Add fade-down to the tagline div that doesn't already have data-aos
            content = content.replace(
                /(<div[^>]*class="[^"]*tracking-\[0\.[456]em\][^"]*")(>)/g,
                (match, p1, p2) => {
                    if (!match.includes('data-aos')) {
                        modified = true;
                        return p1 + ' data-aos="fade-down"' + p2;
                    }
                    return match;
                }
            );
            
            content = content.replace(
                /(<span[^>]*class="[^"]*tracking-\[0\.[456]em\][^"]*")(>)/g,
                (match, p1, p2) => {
                    if (!match.includes('data-aos')) {
                        modified = true;
                        return p1 + ' data-aos="fade-down"' + p2;
                    }
                    return match;
                }
            );
        }
        
        // Add fade-up to h1 tags that don't already have it
        content = content.replace(
            /(<h1[^>]*)(>)/g,
            (match, p1, p2) => {
                if (!match.includes('data-aos')) {
                    modified = true;
                    return p1 + ' data-aos="fade-up"' + p2;
                }
                return match;
            }
        );
        
        // Add fade-up with delay to subtitle/description paragraphs near h1
        // Looking for max-w-* mx-auto text patterns (common for hero subtitles)
        content = content.replace(
            /(<p[^>]*class="[^"]*max-w-[^"]*mx-auto[^"]*")(>)/g,
            (match, p1, p2) => {
                if (!match.includes('data-aos')) {
                    modified = true;
                    return p1 + ' data-aos="fade-up" data-aos-delay="100"' + p2;
                }
                return match;
            }
        );
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`${file}: Added animations`);
        } else {
            console.log(`${file}: No changes needed`);
        }
        
    } catch (err) {
        console.log(`${file}: Error - ${err.message}`);
    }
});

console.log('\nDone! Commit and push.');
