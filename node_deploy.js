const { execSync } = require('child_process');

function run(cmd) {
    console.log(`Executing: ${cmd}`);
    try {
        const out = execSync(cmd, { stdio: 'inherit' });
    } catch (e) {
        console.error(`FAILED: ${e.message}`);
    }
}

process.chdir('e:/brkthru-digital-landing');

run('git add -A');
run('git commit -m "DEBUG: Red hamburger menu and force push"');
run('git push origin master:main --force');
run('git push origin master:master --force');
