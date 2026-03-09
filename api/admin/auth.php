<?php
require_once __DIR__ . '/../config.php';
start_session();

$method = $_SERVER['REQUEST_METHOD'];

// POST - Login
if ($method === 'POST') {
    $body = get_json_body();
    $username = $body['username'] ?? '';
    $password = $body['password'] ?? '';

    if (!$username || !$password) {
        json_response(['error' => 'Username and password are required.'], 400);
    }

    $stmt = db()->prepare("SELECT * FROM AdminUser WHERE username = ?");
    $stmt->execute([$username]);
    $admin = $stmt->fetch();

    if (!$admin || !password_verify($password, $admin['passwordHash'])) {
        json_response(['error' => 'Invalid credentials.'], 401);
    }

    $_SESSION['admin_id'] = $admin['id'];
    $_SESSION['admin_username'] = $admin['username'];

    json_response(['success' => true, 'username' => $admin['username']]);
}

// DELETE - Logout
if ($method === 'DELETE') {
    session_destroy();
    json_response(['success' => true]);
}

// GET - Check auth status
if ($method === 'GET') {
    $action = $_GET['action'] ?? '';
    if ($action === 'check' || str_contains($_SERVER['REQUEST_URI'] ?? '', 'check')) {
        if (!empty($_SESSION['admin_id'])) {
            json_response(['authenticated' => true, 'username' => $_SESSION['admin_username'] ?? '']);
        } else {
            json_response(['authenticated' => false], 401);
        }
    }
}

json_response(['error' => 'Method not allowed'], 405);
