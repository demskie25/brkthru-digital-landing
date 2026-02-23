const { execSync } = require('child_process');
const fs = require('fs');

const logFile = 'e:/brkthru-digital-landing/deploy_testimonial_update.txt';
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

run('git add checkout.html');
run('git commit -m "UPDATE: New testimonial from Geno Hadel and description update in checkout"');
run('git push origin master:main --force');
run('git push origin master:master --force');

console.log('Deploy run finished.');
