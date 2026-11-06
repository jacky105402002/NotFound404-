@echo off
cd /d "%~dp0"
echo NotFound404 preview: http://127.0.0.1:4174/
echo Press Ctrl+C to stop.
set PORT=4174
node server.mjs
pause

