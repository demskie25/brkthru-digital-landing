const { execSync } = require('child_process');
const fs = require('fs');

const logFile = 'deploy_backdoor_v5.log';
const log = [];

function run(cmd) {
    log.push(`\n> ${cmd}`);
    try {
        const out = execSync(cmd, { encoding: 'utf8' });
        log.push(out);
        return true;
    } catch (e) {
        log.push(`FAILED: ${e.message}`);
        if (e.stdout) log.push(`STDOUT: ${e.stdout}`);
        if (e.stderr) log.push(`STDERR: ${e.stderr}`);
        return false;
    }
}

log.push('=== BACKDOOR DEPLOY V5 ===');
run('git status');
run('git add assessments.html');
run('git commit -m "V114: Added Backdoor Access to Assessments"');
run('git push origin master:main --force');
run('git push origin master:master --force');

fs.writeFileSync(logFile, log.join('\n'), 'utf8');
console.log(`Log written to ${logFile}`);
