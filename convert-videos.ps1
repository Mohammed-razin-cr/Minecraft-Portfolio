$env:PATH = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

$galleryPath = Join-Path $PSScriptRoot "public\gallery"
$movFiles = Get-ChildItem -Path $galleryPath -Filter "*.MOV"

Write-Host "Found $($movFiles.Count) MOV file(s) to convert..."

$index = 1
foreach ($file in $movFiles) {
    $inputPath = $file.FullName
    $outputName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name) + ".mp4"
    $outputPath = Join-Path $galleryPath $outputName
    $sizeMB = [math]::Round($file.Length / 1MB, 1)

    Write-Host "[$index/$($movFiles.Count)] Converting: $($file.Name) ($sizeMB MB) -> $outputName"

    $ffmpegArgs = "-i `"$inputPath`" -c:v libx264 -crf 28 -preset medium -vf scale=-2:720 -c:a aac -b:a 128k -movflags +faststart -y `"$outputPath`""

    $proc = Start-Process -FilePath "ffmpeg" -ArgumentList $ffmpegArgs -Wait -PassThru -NoNewWindow

    if ($proc.ExitCode -eq 0) {
        $outSize = [math]::Round((Get-Item $outputPath).Length / 1MB, 1)
        Write-Host "  Done: $outputName ($outSize MB)"
    }
    else {
        Write-Host "  FAILED: $($file.Name)"
    }

    $index++
}

Write-Host "All conversions complete!"
Write-Host "Next: update src paths in app/gallery/page.tsx from .MOV to .mp4"
