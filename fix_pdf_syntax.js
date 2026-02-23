const fs = require('fs');

function fixFile(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    
    // Fix escaped backticks
    content = content.replace(/styleSheet\.textContent = \\`/g, 'styleSheet.textContent = `');
    content = content.replace(/                            \\`;/g, '                            `;');
    
    // Fix escaped question mark in regex
    content = content.replace(/source\.match\(\/\^<\\\\\?xml\/\)/g, 'source.match(/^<\\?xml/)');

    fs.writeFileSync(filename, content, 'utf8');
    console.log(`Fixed ${filename}`);
}

fixFile('e:/brkthru-digital-landing/assessments.html');
fixFile('e:/brkthru-digital-landing/start-enneagram.html');
