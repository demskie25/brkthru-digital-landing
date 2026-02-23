@echo off
setlocal
cls
echo ===========================================
echo   BRKTHRU DIGITAL - WINDOWS DEPLOY V127
echo ===========================================
echo.
echo [1/3] STAGING CHANGES...
echo [STAGING ALL ASSETS AND PATCHES]
git add .
echo.
echo [2/3] COMMITTING...
git commit -m "V127: Enhanced Enneagram Reporting Logic with Leadership Profiles"
echo.
echo [3/3] PUSHING TO GITHUB...
git push origin master:main --force
echo.
echo ===========================================
echo   DEPLOYMENT SUCCESSFUL
echo ===========================================
