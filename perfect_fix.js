const fs = require('fs');

const problems = JSON.parse(fs.readFileSync('problems.json', 'utf8'));
let files = [...new Set(problems.map(p => p.path))];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let lines = content.split('\n');
  let modified = false;
  let newStyles = [];
  
  let fileProblems = problems.filter(p => p.path === file);
  
  fileProblems.forEach(p => {
    let lineIdx = p.startLine - 1;
    let line = lines[lineIdx];
    if (line === undefined) return;
    
    let origLine = line;

    // 1. backdrop-filter
    if (p.message.includes('backdrop-filter') && !line.includes('-webkit-backdrop-filter')) {
      // Find `backdrop-filter: value;` or `backdrop-filter: value` without semicolon
      line = line.replace(/backdrop-filter:\s*([^;]+)(;?)/g, (match, val, semi) => {
        return `-webkit-backdrop-filter: ${val}${semi} backdrop-filter: ${val}${semi}`;
      });
    }

    // 2. page-page-break-before
    if (p.message.includes('page-page-break-before')) {
      line = line.replace(/page-page-break-before/g, 'page-break-before');
    }

    // 3. background-clip
    if (p.message.includes('-webkit-background-clip') && !line.includes('-webkit-background-clip')) {
      line = line.replace(/background-clip:\s*([^;]+)(;?)/g, (match, val, semi) => {
        return `-webkit-background-clip: ${val}${semi} background-clip: ${val}${semi}`;
      });
    }

    // 4. select element title
    if (p.message.includes('accessible name') && line.includes('<select') && !line.includes('title=')) {
      line = line.replace(/<select/g, '<select title="Select an option"');
    }

    // 5. inline styles
    if (p.message.includes('CSS inline styles')) {
      const styleMatch = line.match(/style="([^"]+)"/);
      if (styleMatch) {
        const styleContent = styleMatch[1];
        const className = `auto-style-${p.startLine}`;
        newStyles.push(`.${className} { ${styleContent} }`);
        
        // Remove style attribute
        line = line.replace(/\s*style="[^"]+"/, '');
        
        // Add class
        if (line.includes('class="')) {
          line = line.replace(/class="/, `class="${className} `);
        } else {
          // Find the first tag and insert class
          line = line.replace(/<([a-zA-Z0-9-]+)/, `<$1 class="${className}"`);
        }
      }
    }

    if (line !== origLine) {
      lines[lineIdx] = line;
      modified = true;
    }
  });

  if (modified) {
    if (newStyles.length > 0) {
      let styleBlock = `\n<style>\n/* Auto-generated styles from inline replacements */\n${newStyles.join('\n')}\n</style>\n`;
      let headCloseIdx = lines.findIndex(l => l.includes('</head>'));
      if (headCloseIdx !== -1) {
        lines.splice(headCloseIdx, 0, styleBlock);
      } else {
        lines.unshift(styleBlock);
      }
    }
    
    fs.writeFileSync(file, lines.join('\n'));
    console.log('Fixed', file);
  }
});
