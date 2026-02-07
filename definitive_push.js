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

    runGit('git status');
    runGit('git add .');
    runGit('git commit -m "FINAL: Restored Universal Header site-wide and cleaned duplicates"');
    runGit('git push origin master:main --force');
    runGit('git push origin master:master --force');
} catch (e) {
    console.log(`Global Error: ${e.message}`);
}
