<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

$body = get_json_body();
$name = trim($body['name'] ?? '');
$email = trim($body['email'] ?? '');
$subject = trim($body['subject'] ?? '');
$message = trim($body['message'] ?? '');
$phone = trim($body['phone'] ?? '');

if (!$name || !$email || !$subject || !$message) {
    json_response(['error' => 'Please fill in all required fields.'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['error' => 'Please provide a valid email address.'], 400);
}

try {
    $stmt = db()->prepare("INSERT INTO ContactSubmission (id, name, email, phone, subject, message, isRead, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, 0, NOW(), NOW())");
    $stmt->execute([generate_id(), $name, strtolower($email), $phone, $subject, $message]);
    json_response(['message' => "Thank you! We'll get back to you soon."], 201);
} catch (Exception $e) {
    json_response(['error' => 'Something went wrong. Please try again.'], 500);
}
