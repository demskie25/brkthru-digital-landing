@echo off
echo ===========================================
echo   BRKTHRU DIGITAL - V123 FIX DEPLOY
echo ===========================================
echo.
echo [1/3] STAGING CHANGES...
git add start-enneagram.html assessments.html patch_pdf.js do_push.py do_push2.py
echo.
echo [2/3] COMMITTING...
git commit -m "V123: CSS Map explicit height fix and PDF await generation"
echo.
echo [3/3] PUSHING TO GITHUB...
git push origin master:main --force
git push origin master --force
echo.
echo ===========================================
echo   DEPLOYMENT BATCH SCRIPT FINISHED
echo ===========================================
