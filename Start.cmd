@echo off

echo Starting Database...
start "Database" cmd /k mongod

echo Starting server...
start "Server" cmd /k cd ./src/server ^& node ./index.js

echo Starting client... 
start "Client" cmd /k cd ./src/client ^& npm run dev

echo Starting admin...
start "Admin" cmd /k cd ./src/admin ^& npm run dev

echo Done!