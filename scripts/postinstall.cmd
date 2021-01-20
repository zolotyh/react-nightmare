mkcert.exe /?  2> NUL

IF NOT %ERRORLEVEL%==9009 (
  ECHO mkcert.exe exists in path
) ELSE (
  ECHO ##########################################################
  ECHO ## Please install mkcert via choco and run npm ci again ##
  ECHO ## see:                                                 ##
  ECHO ##   https://chocolatey.org/install                     ##
  ECHO ##   https://github.com/FiloSottile/mkcert              ##
  ECHO ##########################################################
  EXIT /b 9009
)

IF EXIST .\.certs (
  ECHO ################################################
  ECHO " Success. Folder .certs is exists. Skipping  ##
  ECHO ################################################
) ELSE (
  mkdir.exe .certs
  mkcert.exe -key-file .\.certs\key.pem -cert-file .\.certs\cert.pem "*.test" localhost
)
