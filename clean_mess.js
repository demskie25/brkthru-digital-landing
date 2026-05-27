const fs = require('fs');
const { execSync } = require('child_process');
try {
  let files = execSync('dir /s /b *.html *.css', { encoding: 'utf8' }).split('\r\n').filter(Boolean);
  files.forEach(file => {
    if (file.includes('node_modules') || file.includes('.git')) return;
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Fix backdrop-filter mess
    if (content.includes('-webkit--')) {
      content = content.replace(/-webkit--+(webkit-)?(backdrop-filter|background-clip):[^\n;]+(;?)\s*backdrop-filter:[^\n;]+(;?)/g, '-webkit-$2: $3 $2: $3');
      content = content.replace(/-webkit--+(webkit-)?(backdrop-filter|background-clip)/g, '-webkit-$2');
      // If there are duplicate lines, we should just clean it entirely
      modified = true;
    }

    if (modified) {
       let lines = content.split('\n');
       for (let i=0; i<lines.length; i++) {
         if (lines[i].includes('-webkit--')) {
           lines[i] = lines[i].replace(/-webkit--+(webkit-)?/g, '-webkit-');
         }
         // Remove duplicate backdrop-filter on the same line if we already have it
         if (lines[i].includes('-webkit-backdrop-filter') && lines[i].indexOf('backdrop-filter', lines[i].indexOf('backdrop-filter')+1) !== -1) {
            let match = lines[i].match(/-webkit-backdrop-filter:\s*([^;]+);/);
            if (match) {
                lines[i] = lines[i].replace(/.*-webkit-backdrop-filter.*/, `  -webkit-backdrop-filter: ${match[1]}; backdrop-filter: ${match[1]};`);
            }
         }
         
         // Fix background-clip similarly
         if (lines[i].includes('-webkit-background-clip') && lines[i].indexOf('background-clip', lines[i].indexOf('background-clip')+1) !== -1) {
             let match = lines[i].match(/-webkit-background-clip:\s*([^;]+);/);
             if (match) {
                 lines[i] = lines[i].replace(/.*-webkit-background-clip.*/, `  -webkit-background-clip: ${match[1]}; background-clip: ${match[1]};`);
             }
         }
       }
       // Also remove the extra lines if they were added one after another
       lines = lines.filter((line, index, arr) => {
         if (index > 0 && line.trim() === arr[index-1].trim() && line.includes('-webkit-')) {
           return false;
         }
         return true;
       });

       fs.writeFileSync(file, lines.join('\n'));
       console.log('Cleaned mess in', file);
    }
  });
} catch (e) {
  console.log(e);
}
