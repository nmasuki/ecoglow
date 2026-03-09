<?php
require_once __DIR__ . '/../config.php';
require_admin();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $categories = db()->query("SELECT * FROM Category ORDER BY `order` ASC")->fetchAll();
    json_response($categories);
}

if ($method === 'PUT') {
    $body = get_json_body();
    $id = $body['id'] ?? '';
    if (!$id) json_response(['error' => 'ID required'], 400);

    $sets = [];
    $params = [];
    foreach (['name', 'description', 'accentColor'] as $field) {
        if (isset($body[$field])) { $sets[] = "$field = ?"; $params[] = $body[$field]; }
    }
    if (isset($body['order'])) { $sets[] = "`order` = ?"; $params[] = intval($body['order']); }

    if (empty($sets)) json_response(['error' => 'No fields to update'], 400);

    $sets[] = "updatedAt = NOW()";
    $params[] = $id;

    db()->prepare("UPDATE Category SET " . implode(', ', $sets) . " WHERE id = ?")->execute($params);
    json_response(['success' => true]);
}

json_response(['error' => 'Method not allowed'], 405);
