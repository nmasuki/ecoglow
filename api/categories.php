<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$slug = $_GET['slug'] ?? null;

if ($method === 'GET') {
    if ($slug) {
        $stmt = db()->prepare("SELECT * FROM Category WHERE slug = ?");
        $stmt->execute([$slug]);
        $cat = $stmt->fetch();
        if (!$cat) json_response(['error' => 'Category not found'], 404);
        json_response($cat);
    } else {
        $categories = db()->query("SELECT * FROM Category ORDER BY `order` ASC")->fetchAll();
        json_response($categories);
    }
}

json_response(['error' => 'Method not allowed'], 405);
