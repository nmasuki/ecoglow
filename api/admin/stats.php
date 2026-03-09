<?php
require_once __DIR__ . '/../config.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['error' => 'Method not allowed'], 405);
}

$productCount = db()->query("SELECT COUNT(*) FROM Product")->fetchColumn();
$categoryCount = db()->query("SELECT COUNT(*) FROM Category")->fetchColumn();
$unreadCount = db()->query("SELECT COUNT(*) FROM ContactSubmission WHERE isRead = 0")->fetchColumn();
$totalContacts = db()->query("SELECT COUNT(*) FROM ContactSubmission")->fetchColumn();

json_response([
    'productCount' => (int)$productCount,
    'categoryCount' => (int)$categoryCount,
    'unreadCount' => (int)$unreadCount,
    'totalContacts' => (int)$totalContacts,
]);
