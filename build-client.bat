@echo off
REM Build the client app (use npm.cmd to avoid PowerShell execution policy issues)
cd /d "%~dp0client"
npm.cmd run build
