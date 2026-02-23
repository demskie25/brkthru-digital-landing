const { execSync } = require('child_process');
const fs = require('fs');

const logFile = 'e:/brkthru-digital-landing/deploy_log_pdf_fix_v3.txt';
fs.writeFileSync(logFile, '--- DEPLOY LOG ---\n');

function run(cmd) {
    fs.appendFileSync(logFile, `\nExecuting: ${cmd}\n`);
    try {
        const out = execSync(cmd, { stdio: 'pipe' });
        fs.appendFileSync(logFile, `STDOUT: ${out.toString()}\n`);
    } catch (e) {
        fs.appendFileSync(logFile, `FAILED: ${e.message}\n`);
        if (e.stderr) fs.appendFileSync(logFile, `STDERR: ${e.stderr.toString()}\n`);
        if (e.stdout) fs.appendFileSync(logFile, `STDOUT(err): ${e.stdout.toString()}\n`);
    }
}

process.chdir('e:/brkthru-digital-landing');

run('git status');
run('git add assessments.html start-enneagram.html');
run('git commit -m "FIX: Explicit SVG width/height and remove duplicate header in PDF"');
run('git push origin master:main --force');
run('git push origin master:master --force');

fs.appendFileSync(logFile, '\n--- DEPLOY FINISHED ---\n');
console.log('Done. Check deploy_log_pdf_fix_v3.txt');
