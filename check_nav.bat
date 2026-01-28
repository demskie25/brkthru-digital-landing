@echo off
node -e "const fs = require('fs'); const c = fs.readFileSync('index.html', 'utf8'); console.log('Has univ-nav:', c.includes('univ-nav')); console.log('Has univ-header:', c.includes('univ-header')); console.log('File size:', c.length);" > node_check.txt 2>&1
type node_check.txt
