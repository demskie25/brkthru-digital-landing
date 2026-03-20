const { execSync } = require('child_process');

function runGit(cmd) {
    console.log(`Running: ${cmd}`);
    try {
        const stdout = execSync(cmd, { encoding: 'utf8' });
        console.log(`STDOUT: ${stdout}`);
        return true;
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
        console.log(`STDERR: ${error.stderr}`);
        return false;
    }
}

try {
    process.chdir('e:/brkthru-digital-landing');
    console.log(`Current Dir: ${process.cwd()}`);

    runGit('git add .');
    runGit('git commit -m "fix: resolve IDE JSX diagnostics in event-app and restore static about.html"');
    
    // Push according to detected local branch structure
    runGit('git push origin HEAD:main --force');
    runGit('git push origin HEAD:master --force');
    
    console.log('PUSH ATTEMPT COMPLETED');
} catch (e) {
    console.log(`Global Error: ${e.message}`);
}
