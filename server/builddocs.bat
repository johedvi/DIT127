@echo OFF
(npx tsc
@echo ON
npx jsdoc ./router ./model ./service ./db -d %~dp0/DOCS)