const fs = require('fs');
const filepath = 'index.html';

try {
    const content = fs.readFileSync(filepath, 'utf8');
    const lines = content.split(/\r?\n/);
    console.log(`Total lines: ${lines.length}`);
    for (let i = 410; i < 430; i++) {
        if (lines[i]) {
            console.log(`${i+1}: [${lines[i]}]`);
        }
    }
} catch (err) {
    console.error(err);
}
