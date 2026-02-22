const { execSync } = require('child_process');

function run(cmd) {
    console.log("Running: " + cmd);
    try {
        const stdout = execSync(cmd, { stdio: 'pipe', encoding: 'utf8' });
        console.log("OUT:", stdout);
    } catch(e) {
        console.log("ERR:", e.stderr);
        console.log("RC:", e.status);
    }
}

console.log("Starting Node Git Deploy...");
run('git add assessments.html start-enneagram.html patch_pdf.js');
run('git commit -m "V123: PDF rendering Explicit SVG sizing and cleanup fixes"');
run('git push origin master:main --force');
run('git push origin master --force');
console.log("Deploy finished.");
