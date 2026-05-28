# Stop hugo server (Ctrl+C) before running. Clears stale build cache and starts fresh.
$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
Remove-Item -Recurse -Force public, resources -ErrorAction SilentlyContinue
hugo build
Write-Host "`nStarting dev server at http://localhost:1313/ (hard-refresh browser after load)`n"
hugo server --baseURL http://localhost:1313/ --disableFastRender
