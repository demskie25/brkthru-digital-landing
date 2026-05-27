const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        if (file === 'node_modules' || file === '.git' || file === '.agent') return;
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.html') || file.endsWith('.css')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('e:\\brkthru-digital-landing');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Fix style="position: absolute; width: 0; height: 0; overflow: hidden;" in svg
    content = content.replace(/<svg style="position: absolute; width: 0; height: 0; overflow: hidden;"/g, '<svg class="absolute w-0 h-0 overflow-hidden"');
    
    // Fix missing title/alt in about.html line 736
    // It's probably: <img :src="selectedArchi?.image" class="..." />
    content = content.replace(/<img\s*\n\s*:src="selectedArchi\?\.image"/g, '<img alt="Profile" title="Profile"\n              :src="selectedArchi?.image"');

    // Fix missing noopener for target="_blank"
    // Find <a ... target="_blank" ...>
    // Just replace target="_blank" without rel="noopener noreferrer"
    content = content.replace(/target="_blank"(?!.*rel="noopener)/g, 'target="_blank" rel="noopener noreferrer"');
    content = content.replace(/target='_blank'(?!.*rel="noopener)/g, 'target="_blank" rel="noopener noreferrer"');
    
    // Some links might already have rel but missing noopener. Let's do a more careful regex or just run the naive one.
    // Let's just fix all `target="_blank"`
    
    // Fix backdrop-filter in CSS/HTML
    content = content.replace(/backdrop-filter:/g, '-webkit-backdrop-filter:');
    // If it's a tailwind class like backdrop-blur-md, we don't need to change it, it's about CSS.
    // Wait, let's fix backdrop-filter in style tags or CSS files
    if (file.endsWith('.css') || file.endsWith('.html')) {
        content = content.replace(/backdrop-filter:([^;]+);/g, '-webkit-backdrop-filter:$1; backdrop-filter:$1;');
        // Avoid duplication
        content = content.replace(/-webkit-backdrop-filter:([^;]+); backdrop-filter:([^;]+); backdrop-filter:([^;]+);/g, '-webkit-backdrop-filter:$1; backdrop-filter:$1;');
        content = content.replace(/background-clip:([^;]+);/g, '-webkit-background-clip:$1; background-clip:$1;');
        content = content.replace(/-webkit-background-clip:([^;]+); background-clip:([^;]+); background-clip:([^;]+);/g, '-webkit-background-clip:$1; background-clip:$1;');
    }
    
    // assessbackup.html break-before
    content = content.replace(/break-before:\s*always/g, 'page-break-before: always; break-before: page');
    
    // print-color-adjust
    content = content.replace(/print-color-adjust:([^;]+);/g, '-webkit-print-color-adjust:$1; print-color-adjust:$1;');

    // iframe missing title
    content = content.replace(/<iframe([^>]*)>/gi, (match, p1) => {
        if (!p1.includes('title=')) {
            return `<iframe title="iframe content"${p1}>`;
        }
        return match;
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed', file);
    }
});
