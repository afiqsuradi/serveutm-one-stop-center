@echo off

echo Starting Database...
start "Database" cmd /k C: ^& mongod

timeout /t 5

echo Starting server...
start "Server" cmd /k cd ./src/server ^& code ./ ^& node ./index.js

timeout /t 5

echo Starting client... 
start "Client" cmd /k cd ./src/client ^& code ./ ^& npm run dev

timeout /t 15

echo Starting admin...
start "Admin" cmd /k cd ./src/admin ^& code ./ ^& npm run dev

echo Done!