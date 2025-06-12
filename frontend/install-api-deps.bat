@echo off
echo Installing API dependencies...

:: Install required dependencies
call npm install --legacy-peer-deps axios openapi-types

:: Install type definitions for better TypeScript support
call npm install --legacy-peer-deps --save-dev @types/axios

echo Installation complete!
pause 