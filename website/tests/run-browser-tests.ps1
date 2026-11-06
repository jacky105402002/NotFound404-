param([string]$OutputPath = 'website/qa/browser-test.log')
$ErrorActionPreference='Stop'
$OutputEncoding = New-Object System.Text.UTF8Encoding
[Console]::OutputEncoding = $OutputEncoding
$ErrorActionPreference='Continue'
$testOutput = & playwright-cli -s=studio run-code --filename=website/tests/browser-check.js 2>&1 | Out-String
$cliExit = $LASTEXITCODE
$ErrorActionPreference='Stop'
$testOutput | Set-Content -LiteralPath $OutputPath -Encoding utf8
Write-Output $testOutput
if ($cliExit -ne 0 -or $testOutput -match '### Error' -or $testOutput -notmatch '"passed":\s*true') {throw 'Browser acceptance checks failed; inspect browser-test.log.'}

