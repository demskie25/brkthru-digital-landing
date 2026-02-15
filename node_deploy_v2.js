const { execSync } = require('child_process');
const fs = require('fs');

const logFile = 'e:/brkthru-digital-landing/deploy_log.txt';
fs.writeFileSync(logFile, '--- DEPLOY LOG ---\n');

function run(cmd) {
    fs.appendFileSync(logFile, `Executing: ${cmd}\n`);
    try {
        const out = execSync(cmd, { stdio: 'pipe' });
        fs.appendFileSync(logFile, `STDOUT: ${out.toString()}\n`);
    } catch (e) {
        fs.appendFileSync(logFile, `FAILED: ${e.message}\n`);
        if (e.stderr) fs.appendFileSync(logFile, `STDERR: ${e.stderr.toString()}\n`);
    }
}

process.chdir('e:/brkthru-digital-landing');

run('git add -A');
run('git commit -m "FIX: Force visibility of mobile menu and debug red color"');
run('git push origin master:main --force');
run('git push origin master:master --force');

fs.appendFileSync(logFile, '--- DEPLOY FINISHED ---\n');
console.log('Done. Check deploy_log.txt');
