const { execSync } = require('child_process');
const fs = require('fs');

function runGit(cmd) {
    try {
        const stdout = execSync(cmd, { encoding: 'utf8' });
        return { success: true, output: stdout };
    } catch (error) {
        return { success: false, output: error.stdout, error: error.stderr || error.message };
    }
}

const steps = [
    'git add .',
    'git commit -m "fix: resolve IDE JSX diagnostics and restore static about.html"',
    'git push origin main:main --force',
    'git push origin main:master --force',
    'git log -n 1 --pretty=oneline'
];

let log = 'DEPLOY ATTEMPT LOG:\n';
steps.forEach(s => {
    log += `Running: ${s}\n`;
    const res = runGit(s);
    log += `Result: ${res.success ? 'SUCCESS' : 'FAILED'}\n`;
    log += `OUT: ${res.output || ''}\n`;
    log += `ERR: ${res.error || ''}\n`;
    log += '---\n';
});

fs.writeFileSync('e:/brkthru-digital-landing/final_deploy_log.txt', log);
console.log('Final Deploy script completed.');
