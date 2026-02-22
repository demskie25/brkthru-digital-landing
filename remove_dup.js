const fs = require('fs');

function fix(file) {
    let content = fs.readFileSync(file, 'utf8');
    const target = /window\.generatePDF = function\(\) \{\s*const element = document\.getElementById\('pdfContentArea'\);\s*const opt = \{\s*margin:\s*0\.3,\s*filename:\s*'Leadership_Assessment_Report\.pdf',\s*image:\s*\{ type: 'jpeg', quality: 0\.98 \},\s*html2canvas:\s*\{ scale: 2, useCORS: true \},\s*jsPDF:\s*\{ unit: 'in', format: 'letter', orientation: 'portrait' \}\s*\};\s*\/\/ Temporarily fix height issues for PDF\s*element\.style\.width = '100%';\s*html2pdf\(\)\.set\(opt\)\.from\(element\)\.save\(\)\.then\(\(\) => \{\s*\/\/ Restore if needed\s*\}\);\s*\};/g;
    
    content = content.replace(target, '// (Delegated to Premium Engine V124)');
    fs.writeFileSync(file, content, 'utf8');
    console.log(file + " updated.");
}

fix('assessments.html');
fix('start-enneagram.html');
