# FTP Recursive Upload Script for EcoGlow deployment
param(
    [string]$FtpHost = "ecoglow.co.ke",
    [string]$FtpUser = "ecoglowc",
    [string]$FtpPass = "Enter@hostafrica",
    [string]$LocalDir = "C:\Projects\nmasuki\EcoGlow.Site\deploy-package",
    [string]$RemoteDir = "/site"
)

$ftpBase = "ftp://${FtpHost}${RemoteDir}"
$cred = New-Object System.Net.NetworkCredential($FtpUser, $FtpPass)

function Upload-FtpFile($localPath, $remotePath) {
    $uri = New-Object System.Uri("$ftpBase/$remotePath")
    $request = [System.Net.FtpWebRequest]::Create($uri)
    $request.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $request.Credentials = $cred
    $request.UseBinary = $true
    $request.UsePassive = $true
    $request.KeepAlive = $false

    try {
        $fileContent = [System.IO.File]::ReadAllBytes($localPath)
        $request.ContentLength = $fileContent.Length
        $stream = $request.GetRequestStream()
        $stream.Write($fileContent, 0, $fileContent.Length)
        $stream.Close()
        $response = $request.GetResponse()
        $response.Close()
        return $true
    } catch {
        return $false
    }
}

function Create-FtpDirectory($remotePath) {
    $uri = New-Object System.Uri("$ftpBase/$remotePath")
    $request = [System.Net.FtpWebRequest]::Create($uri)
    $request.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
    $request.Credentials = $cred
    $request.UsePassive = $true
    $request.KeepAlive = $false

    try {
        $response = $request.GetResponse()
        $response.Close()
    } catch {
        # Directory may already exist, ignore error
    }
}

# Get all files
$files = Get-ChildItem -Path $LocalDir -Recurse -File -Force
$total = $files.Count
$count = 0
$failed = @()

Write-Host "Uploading $total files to ftp://${FtpHost}${RemoteDir}/"
Write-Host "================================================"

# Collect and create all unique directories first
Write-Host "Creating directories..."
$dirs = $files | ForEach-Object {
    $rel = $_.FullName.Substring($LocalDir.Length + 1).Replace('\', '/')
    $parts = $rel.Split('/')
    for ($i = 0; $i -lt ($parts.Length - 1); $i++) {
        ($parts[0..$i] -join '/')
    }
} | Sort-Object -Unique | Sort-Object { $_.Length }

foreach ($dir in $dirs) {
    Create-FtpDirectory $dir
}
Write-Host "Created $($dirs.Count) directories."

# Upload files
foreach ($file in $files) {
    $count++
    $relativePath = $file.FullName.Substring($LocalDir.Length + 1).Replace('\', '/')
    $pct = [math]::Round(($count / $total) * 100)

    if ($count % 50 -eq 0 -or $count -eq $total -or $count -le 5) {
        Write-Host "[$pct%] ($count/$total) $relativePath"
    }

    $success = Upload-FtpFile $file.FullName $relativePath
    if (-not $success) {
        $failed += $relativePath
        Write-Host "  FAILED: $relativePath"
    }
}

Write-Host ""
Write-Host "================================================"
Write-Host "Upload complete: $($total - $failed.Count)/$total files succeeded."
if ($failed.Count -gt 0) {
    Write-Host "Failed files ($($failed.Count)):"
    $failed | ForEach-Object { Write-Host "  - $_" }
}
