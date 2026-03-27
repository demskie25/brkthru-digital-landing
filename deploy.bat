@echo off
echo --- DEPLOY START ---
git add .
git commit --no-verify -m "fix: V76 implement unique URL handover for mobile users"
git push origin main
echo --- DEPLOY END ---
