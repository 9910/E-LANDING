@echo off
setlocal EnableExtensions
cd /d "%~dp0"

if "%PORT%"=="" set PORT=5000
if "%ADMIN_PORT%"=="" set ADMIN_PORT=5001

if not exist "client\\node_modules" (
  echo Installing frontend dependencies...
  pushd client
  call npm install
  popd
)

if not exist "client\\dist\\index.html" (
  echo Building frontend for production...
  pushd client
  call npm run build
  popd
)

if not exist "admin\\node_modules" (
  echo Installing admin dashboard dependencies...
  pushd admin
  call npm install
  popd
)

if not exist "admin\\dist\\index.html" (
  echo Building admin dashboard for production...
  pushd admin
  call npm run build
  popd
)

echo Starting admin dashboard on port %ADMIN_PORT%...
start "EduElevate Admin" cmd /c "cd admin && set ADMIN_PORT=%ADMIN_PORT% && npm run serve"

pushd server
if not exist "node_modules" (
  echo Installing backend dependencies...
  call npm install
)

for /f "tokens=5" %%p in ('netstat -ano ^| findstr /R /C:":%PORT% .*LISTENING"') do (
  if not "%%p"=="" (
    echo Port %PORT% already in use by PID %%p. Attempting to terminate...
    taskkill /F /PID %%p >nul 2>&1
  )
)

set NODE_ENV=production
echo Starting Education Institute backend on port %PORT%
call npm start
popd
endlocal
