const fs = require('fs');
const { execSync } = require('child_process');
try {
  let status = execSync('git status', {encoding: 'utf8'});
  let log = execSync('git log -n 5', {encoding: 'utf8'});
  fs.writeFileSync('git_status_now.txt', status + "\n\n" + log);
} catch (e) {
  fs.writeFileSync('git_status_now.txt', e.toString());
}
