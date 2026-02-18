const fs = require('fs');
const path = require('path');

const files = ['index.html', 'odyssey.html', 'corporate.html', 'coaching.html', 'resources.html', 'shop.html'];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if gsap_animations.js is already injected
        if (!content.includes('gsap_animations.js')) {
            // Find the </body> tag and inject script before it
            if (content.includes('</body>')) {
                content = content.replace('</body>', '    <script src="gsap_animations.js"></script>\n</body>');
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Injected GSAP script into ${file}`);
            } else {
                console.log(`Could not find </body> in ${file}`);
            }
        } else {
            console.log(`${file} already has GSAP script`);
        }
    } else {
        console.log(`${file} does not exist`);
    }
});
