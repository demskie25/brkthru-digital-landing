@echo off
node -e "const fs=require('fs'); const c=fs.readFileSync('index.html','utf8'); console.log('Logo count:', (c.match(/brkthru-logo/gi)||[]).length);" > logo_count.txt 2>&1
type logo_count.txt
