@echo off
echo === GIT PUSH LOG === > git_push_log.txt
git push origin master:main >> git_push_log.txt 2>&1
echo Return code: %ERRORLEVEL% >> git_push_log.txt
echo. >> git_push_log.txt
git push origin master >> git_push_log.txt 2>&1
echo Return code: %ERRORLEVEL% >> git_push_log.txt
type git_push_log.txt
