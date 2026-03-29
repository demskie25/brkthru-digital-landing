$path = 'e:\brkthru-digital-landing\start-enneagram.html'
$temp = 'e:\brkthru-digital-landing\start-enneagram.html.tmp'
$reader = [System.IO.File]::OpenText($path)
$writer = [System.IO.StreamWriter]::new($temp)
$lineNumber = 0
while ($null -ne ($line = $reader.ReadLine())) {
    $lineNumber++
    if ($lineNumber -ne 2187) {
        $writer.WriteLine($line)
    }
}
$reader.Close()
$writer.Close()
if (Test-Path $temp) {
    Move-Item $temp $path -Force
}
