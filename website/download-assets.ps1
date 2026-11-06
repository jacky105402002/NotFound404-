$ErrorActionPreference = 'Stop'
$assetList = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'asset-manifest.json') -Raw | ConvertFrom-Json
foreach ($item in $assetList) {
  $assetTarget = Join-Path (Join-Path $PSScriptRoot 'public') $item.path
  & curl.exe -f -s -S -L $item.url -o $assetTarget
  if ($LASTEXITCODE -ne 0) { throw "Asset download failed: $($item.path)" }
}
Get-ChildItem -LiteralPath (Join-Path $PSScriptRoot 'public/assets') | Select-Object Name,Length
