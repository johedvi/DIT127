@echo OFF
(npx tsc
@echo ON
CALL node_modules/.bin/jsdoc ./router ./model ./service ./db -d %~dp0/DOCS)