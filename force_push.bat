@echo off
echo === FORCE PUSH LOG === > push_log.txt
echo. >> push_log.txt
echo Running: git push -f origin master:main >> push_log.txt
git push -f origin master:main >> push_log.txt 2>&1
echo Return code: %ERRORLEVEL% >> push_log.txt
echo. >> push_log.txt
echo Running: git push -f origin master >> push_log.txt
git push -f origin master >> push_log.txt 2>&1
echo Return code: %ERRORLEVEL% >> push_log.txt
echo Done - check push_log.txt
type push_log.txt
