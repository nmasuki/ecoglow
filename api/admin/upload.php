<?php
require_once __DIR__ . '/../config.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

if (empty($_FILES['file'])) {
    json_response(['error' => 'No file provided.'], 400);
}

$file = $_FILES['file'];
$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION)) ?: 'jpg';
$allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

if (!in_array($ext, $allowed)) {
    json_response(['error' => 'Invalid file type.'], 400);
}

$safeName = preg_replace('/[^a-z0-9-]/', '-', strtolower(pathinfo($file['name'], PATHINFO_FILENAME)));
$safeName = $safeName . '-' . time() . '.' . $ext;

$uploadDir = __DIR__ . '/../../public/images/products';
if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

$destPath = $uploadDir . '/' . $safeName;

if (!move_uploaded_file($file['tmp_name'], $destPath)) {
    json_response(['error' => 'Failed to upload file.'], 500);
}

json_response(['url' => '/images/products/' . $safeName]);
