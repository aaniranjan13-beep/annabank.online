@echo off
title Worldwide Bank Directory
cd /d "%~dp0"
echo Starting Worldwide Bank Directory...
start http://localhost:5173
npm run dev
pause
