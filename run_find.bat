@echo off
node find_logos.js > logo_locations.txt 2>&1
type logo_locations.txt
