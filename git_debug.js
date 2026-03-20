const { execSync } = require('child_process');
const fs = require('fs');

const logPath = 'e:/brkthru-digital-landing/git_debug_log.txt';

function log(msg) {
    fs.appendFileSync(logPath, msg + '\n');
    console.log(msg);
}

try {
    fs.writeFileSync(logPath, 'Starting Git Debug Log...\n');
    
    const version = execSync('git --version', { encoding: 'utf8' });
    log(`Git Version: ${version.trim()}`);
    
    const status = execSync('git status', { encoding: 'utf8' });
    log(`Git Status:\n${status}`);

    const lastCommit = execSync('git log -n 1 --pretty=format:"%h - %s (%cr)"', { encoding: 'utf8' });
    log(`Last Commit: ${lastCommit}`);

} catch (e) {
    log(`Error: ${e.message}`);
    log(`Stderr: ${e.stderr}`);
}
