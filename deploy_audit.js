const { execSync } = require('child_process');
const fs = require('fs');

function run(cmd) {
    console.log(`> ${cmd}`);
    try {
        const output = execSync(cmd, { encoding: 'utf8' });
        return output;
    } catch (e) {
        return `ERROR: ${e.message}\n${e.stderr || ''}`;
    }
}

const report = [];
report.push('=== GIT DEPLOYMENT AUDIT ===');
report.push(`Date: ${new Date().toISOString()}`);

report.push('\n--- LOCAL STATUS ---');
report.push(run('git status'));

report.push('\n--- COMMITTING ENFORCEMENT ---');
run('git add .');
report.push(run('git commit -m "DEF: Enforcing premium checkout and UX fix"'));

report.push('\n--- PUSHING TO MAIN ---');
report.push(run('git push origin master:main --force'));

report.push('\n--- PUSHING TO MASTER ---');
report.push(run('git push origin master:master --force'));

report.push('\n--- REMOTE LOG ---');
report.push(run('git log -n 3 --oneline'));

fs.writeFileSync('deploy_audit.log', report.join('\n'));
console.log('AUDIT COMPLETE: Check deploy_audit.log');
