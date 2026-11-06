$ErrorActionPreference = 'Stop'
$fontDir = Join-Path $PSScriptRoot 'public/assets/fonts'
New-Item -ItemType Directory -Force -Path $fontDir | Out-Null
$sourceDir = Join-Path $PSScriptRoot 'font-sources'
New-Item -ItemType Directory -Force -Path $sourceDir | Out-Null
$pageText = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'public/index.html') -Raw
$appText = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'public/app.js') -Raw
$validationText = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'public/validation.mjs') -Raw
$allChars = (($pageText + $appText + $validationText + '尚未選擇尚未填寫資料未送出請填寫有效電子郵件稱呼摘要需求').ToCharArray() | Sort-Object -Unique) -join ''
$latin = -join (32..126 | ForEach-Object {[char]$_})
$fontRequests = @(
  @{ Name='geist'; Family='Geist:wght@400;500;700;800'; Text=$latin },
  @{ Name='noto'; Family='Noto+Sans+TC:wght@400;500;700;900'; Text=$allChars },
  @{ Name='mono'; Family='JetBrains+Mono:wght@400;500;700'; Text=$latin },
  @{ Name='symbols'; Family='Material+Symbols+Sharp'; Text=$null }
)
$fontCss = ''
foreach ($font in $fontRequests) {
  $fontUrl = 'https://fonts.googleapis.com/css2?family=' + $font.Family + '&display=swap'
  if ($font.Text) { $fontUrl += '&text=' + [uri]::EscapeDataString($font.Text) }
  $tempCss = Join-Path $sourceDir ($font.Name + '-source.css')
  & curl.exe -f -s -S -L -A 'Mozilla/5.0 Chrome/131.0.0.0 Safari/537.36' $fontUrl -o $tempCss
  if ($LASTEXITCODE -ne 0) { throw ('Font CSS download failed: ' + $font.Name) }
  $css = Get-Content -LiteralPath $tempCss -Raw
  $fontUrls = [regex]::Matches($css,'url\((https://[^)]+)\)') | ForEach-Object {$_.Groups[1].Value} | Select-Object -Unique
  $i = 0
  foreach ($fontFileUrl in $fontUrls) {
    $i++
    $extension = if ($fontFileUrl -match '\.woff2') {'.woff2'} elseif ($fontFileUrl -match '\.woff') {'.woff'} else {'.ttf'}
    $fontFile = $font.Name + '-' + $i + $extension
    & curl.exe -f -s -S -L $fontFileUrl -o (Join-Path $fontDir $fontFile)
    if ($LASTEXITCODE -ne 0) { throw ('Font download failed: ' + $fontFile) }
    $css = $css.Replace($fontFileUrl,'fonts/'+$fontFile)
  }
  $fontCss += $css + [Environment]::NewLine
}
$fontCss | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'public/assets/fonts.css') -Encoding utf8
Get-ChildItem -LiteralPath $fontDir | Select-Object Name,Length
