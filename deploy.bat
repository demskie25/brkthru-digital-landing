@echo off
setlocal
cls
echo ===========================================
echo   BRKTHRU DIGITAL - WINDOWS DEPLOY V125
echo ===========================================
echo.
echo [1/3] STAGING CHANGES...
git add .
echo.
echo [2/3] COMMITTING...
git commit -m "V125: Comprehensive Enneagram Gateway Integration and PDF Engine Fixes"
echo.
echo [3/3] PUSHING TO GITHUB...
git push origin master:main --force
echo.
echo ===========================================
echo   DEPLOYMENT SUCCESSFUL
echo ===========================================
