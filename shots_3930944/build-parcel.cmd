@echo off

rmdir release /S /Q
parcel build  --no-cache --no-source-maps -d release index.html

pause
