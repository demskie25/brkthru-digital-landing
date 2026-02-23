$files = @(
    "e:\brkthru-digital-landing\assessments.html",
    "e:\brkthru-digital-landing\start-enneagram.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file)
        
        # Replace V127 and V123 patterns
        $content = $content.Replace('V127: Triggering Dual-Backend Sync (Fetch)...', 'V128: Triggering Dual-Backend Sync (Fetch)...')
        $content = $content.Replace('Enneagram Assessment V127 (Dual-Sync)', 'Enneagram Assessment V128 (Dual-Sync)')
        $content = $content.Replace('enneagram_report_v127', 'enneagram_report_v128')
        $content = $content.Replace('Brkthru Digital V127', 'Brkthru Digital V128')
        $content = $content.Replace('V127: Dispatching Dual-Reports...', 'V128: Dispatching Dual-Reports...')
        $content = $content.Replace('V127: Dual-Sync Successful.', 'V128: Dual-Sync Successful.')
        $content = $content.Replace('V127 Sync Error:', 'V128 Sync Error:')
        
        $content = $content.Replace('V123: Triggering Dual-Backend Sync...', 'V128: Triggering Dual-Backend Sync...')
        $content = $content.Replace('Enneagram Assessment V123 (Enhanced Reporting)', 'Enneagram Assessment V128 (Enhanced Reporting)')
        $content = $content.Replace('Enneagram Assessment V123', 'Enneagram Assessment V128')
        $content = $content.Replace('V123: Pabbly Sync Initiated.', 'V128: Pabbly Sync Initiated.')
        $content = $content.Replace('V123: Google Script Sync Initiated.', 'V128: Google Script Sync Initiated.')

        [System.IO.File]::WriteAllText($file, $content)
        Write-Host "Updated $file to V128"
    }
}
