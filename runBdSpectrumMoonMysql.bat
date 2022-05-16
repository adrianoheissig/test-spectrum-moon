@echo off
set ERRORLEVEL=0
if not exist "c:\projetos\spectrum-moon\data" mkdir "c:\projetos\spectrum-moon\data"
docker rm -f bd-spectrum-moon > nul 2>&1
docker run --name bd-spectrum-moon -e MYSQL_ROOT_PASSWORD=12345 -p 3306:3306 -v "c:\projetos\spectrum-moon\data":/var/lib/mysql -d mysql:5.7 
IF '%ERRORLEVEL%' NEQ '0' (echo Erro encontrado ao executar o container: [ %ERRORLEVEL% ] &Exit /b 1)
