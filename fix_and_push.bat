@echo off
echo Running logo removal...
node remove_dupe_logo.js > logo_fix_log.txt 2>&1
type logo_fix_log.txt
echo.
echo Adding files to git...
git add index.html odyssey.html corporate.html coaching.html resources.html shop.html
git commit -m "Remove duplicate logo from all pages"
echo.
echo Pushing to GitHub...
git push origin master:main 2>&1
echo.
echo Done!
