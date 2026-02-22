@echo off
setlocal
cls
echo ===========================================
echo   BRKTHRU DIGITAL - WINDOWS DEPLOY V113
echo ===========================================
echo.
echo [1/3] STAGING CHANGES...
git add .
echo.
echo [2/3] COMMITTING...
git commit -m "V114: Removed pause and fixed assessments"
echo.
echo [3/3] PUSHING TO GITHUB...
git push origin master:main --force
echo.
echo ===========================================
echo   DEPLOYMENT SUCCESSFUL
echo ===========================================
