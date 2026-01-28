@echo off
git log --oneline -3 > git_status.txt 2>&1
git status >> git_status.txt 2>&1
type git_status.txt
