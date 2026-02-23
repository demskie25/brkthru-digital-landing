$pythonProcs = Get-Process -Name python -ErrorAction SilentlyContinue
if ($pythonProcs) {
    $pythonProcs | Stop-Process -Force
    "Killed $($pythonProcs.Count) python processes." | Out-File -FilePath "e:\brkthru-digital-landing\agx_log.txt" -Encoding utf8
} else {
    "No python processes found." | Out-File -FilePath "e:\brkthru-digital-landing\agx_log.txt" -Encoding utf8
}

$file = Get-Item "e:\brkthru-digital-landing\assessments.html"
"File: $($file.FullName), Size: $($file.Length), LastWrite: $($file.LastWriteTime)" | Out-File -FilePath "e:\brkthru-digital-landing\agx_log.txt" -Encoding utf8 -Append
