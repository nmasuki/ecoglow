<?php
require_once __DIR__ . '/../config.php';
start_session();

if (!empty($_SESSION['admin_id'])) {
    json_response(['authenticated' => true, 'username' => $_SESSION['admin_username'] ?? '']);
} else {
    json_response(['authenticated' => false], 401);
}
