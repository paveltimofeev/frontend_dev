@echo off

rmdir release /S /Q
parcel build  --no-cache --no-source-maps --no-minify -d release index.html

pause
