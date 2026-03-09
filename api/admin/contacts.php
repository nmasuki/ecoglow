<?php
require_once __DIR__ . '/../config.php';
require_admin();

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

if ($method === 'GET') {
    $contacts = db()->query("SELECT * FROM ContactSubmission ORDER BY createdAt DESC")->fetchAll();
    // Convert isRead to boolean
    $contacts = array_map(function($c) { $c['isRead'] = (bool)$c['isRead']; return $c; }, $contacts);
    json_response($contacts);
}

if ($method === 'PUT' && $id) {
    $body = get_json_body();
    $sets = [];
    $params = [];
    if (isset($body['isRead'])) { $sets[] = "isRead = ?"; $params[] = $body['isRead'] ? 1 : 0; }
    if (empty($sets)) json_response(['error' => 'No fields to update'], 400);

    $sets[] = "updatedAt = NOW()";
    $params[] = $id;

    db()->prepare("UPDATE ContactSubmission SET " . implode(', ', $sets) . " WHERE id = ?")->execute($params);
    json_response(['success' => true]);
}

if ($method === 'DELETE' && $id) {
    db()->prepare("DELETE FROM ContactSubmission WHERE id = ?")->execute([$id]);
    json_response(['success' => true]);
}

json_response(['error' => 'Method not allowed'], 405);
