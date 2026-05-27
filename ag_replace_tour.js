const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('.git') && !fullPath.includes('node_modules') && !fullPath.includes('.netlify') && !fullPath.includes('.agent')) {
                processDir(fullPath);
            }
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.css') || fullPath.endsWith('.txt')) {
            try {
                let content = fs.readFileSync(fullPath, 'utf8');
                let original = content;

                // Dates
                content = content.replace(/Oct\s*24,\s*2026\s*\([Ss]aturday\)/gi, "Jul 10, 2027 (Saturday)");
                content = content.replace(/Oct\s*26-29,\s*2026\s*\([Mm]on-[Tt]hur\)/gi, "Jul 12-15, 2027 (Mon-Thur)");
                content = content.replace(/Oct\s*21-23,\s*2026\s*\([Ww]ed-[Ff]ri\)/gi, "Jul 7-9, 2027 (Wed-Fri)");
                content = content.replace(/Nov\s*7,\s*2026\s*\([Ss]aturday\)/gi, "Jul 24, 2027 (Saturday)");
                
                content = content.replace(/July 7-9, 2027/gi, "July 7-9, 2027");
                content = content.replace(/July 10, 2027/gi, "July 10, 2027");
                content = content.replace(/July 12-15, 2027/gi, "July 12-15, 2027");
                content = content.replace(/July 24, 2027/gi, "July 24, 2027");

                content = content.replace(/Jul 7-9, 2027/gi, "Jul 7-9, 2027");
                content = content.replace(/Jul 10, 2027/gi, "Jul 10, 2027");
                content = content.replace(/Jul 12-15, 2027/gi, "Jul 12-15, 2027");
                content = content.replace(/Jul 24, 2027/gi, "Jul 24, 2027");

                // Tour names & Copyrights
                content = content.replace(/TOUR 2027/g, "TOUR 2027");
                content = content.replace(/Tour 2027/g, "Tour 2027");
                content = content.replace(/2027 Tour/g, "2027 Tour");
                content = content.replace(/tour2027/g, "tour2027");
                content = content.replace(/2027 Transformation/g, "2027 Transformation");
                content = content.replace(/L\. Michael Hall 2026/g, "L. Michael Hall 2027");
                content = content.replace(/timeline_mountain_summit_2027/g, "timeline_mountain_summit_2027");
                content = content.replace(/of 2027/g, "of 2027");
                content = content.replace(/© 2027/g, "© 2027");
                content = content.replace(/&copy; 2027/g, "&copy; 2027");
                content = content.replace(/copyright 2027/gi, "copyright 2027");

                if (content !== original) {
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log('Updated', fullPath);
                }
            } catch (e) {
                console.error("Error reading", fullPath, e);
            }
        }
    }
}
processDir(process.cwd());

// Also copy image
try {
    if (fs.existsSync('timeline_mountain_summit_2027.png')) {
        fs.copyFileSync('timeline_mountain_summit_2027.png', 'timeline_mountain_summit_2027.png');
        console.log('Copied timeline image to 2027');
    }
} catch (e) {
    console.error(e);
}
