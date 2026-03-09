<?php
require_once __DIR__ . '/../config.php';
require_admin();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $settings = db()->query("SELECT * FROM SeoSettings LIMIT 1")->fetch();
    if (!$settings) {
        $id = generate_id();
        db()->prepare("INSERT INTO SeoSettings (id, siteTitle, siteDescription, ogImage, metaKeywords, createdAt, updatedAt) VALUES (?, 'EcoGlow Soap Solutions', '', '', '', NOW(), NOW())")->execute([$id]);
        $settings = db()->query("SELECT * FROM SeoSettings LIMIT 1")->fetch();
    }
    json_response($settings);
}

if ($method === 'PUT') {
    $body = get_json_body();
    $settings = db()->query("SELECT * FROM SeoSettings LIMIT 1")->fetch();

    if (!$settings) {
        $id = generate_id();
        db()->prepare("INSERT INTO SeoSettings (id, siteTitle, siteDescription, ogImage, metaKeywords, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())")->execute([
            $id, $body['siteTitle'] ?? '', $body['siteDescription'] ?? '', $body['ogImage'] ?? '', $body['metaKeywords'] ?? ''
        ]);
    } else {
        db()->prepare("UPDATE SeoSettings SET siteTitle = ?, siteDescription = ?, ogImage = ?, metaKeywords = ?, updatedAt = NOW() WHERE id = ?")->execute([
            $body['siteTitle'] ?? $settings['siteTitle'],
            $body['siteDescription'] ?? $settings['siteDescription'],
            $body['ogImage'] ?? $settings['ogImage'],
            $body['metaKeywords'] ?? $settings['metaKeywords'],
            $settings['id'],
        ]);
    }

    $settings = db()->query("SELECT * FROM SeoSettings LIMIT 1")->fetch();
    json_response($settings);
}

json_response(['error' => 'Method not allowed'], 405);
