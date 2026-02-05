const fs = require('fs');
const path = require('path');

const replacements = {
    'https://hitpay.link/n6dx11': 'checkout.html?item=bundle',
    'https://hitpay.link/mhy8sc': 'checkout.html?item=book',
    'https://hitpay.link/9zlbvf': 'checkout.html?item=toolkit',
    'https://hitpay.link/y0ymoa': 'checkout.html?item=delegation'
};

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            if (f !== '.git' && f !== 'node_modules') {
                walkDir(dirPath, callback);
            }
        } else {
            callback(dirPath);
        }
    });
}

const targetExtensions = ['.html', '.js', '.jsx', '.tsx', '.ts'];

walkDir('.', (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (targetExtensions.includes(ext)) {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;
            let modified = false;

            for (const [pattern, replacement] of Object.entries(replacements)) {
                if (content.includes(pattern)) {
                    content = content.split(pattern).join(replacement);
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`SUCCESS: Updated ${filePath}`);
            }
        } catch (e) {
            // console.error(`Error processing ${filePath}: ${e.message}`);
        }
    }
});
