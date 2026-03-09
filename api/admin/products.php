<?php
require_once __DIR__ . '/../config.php';
require_admin();

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

// GET - List or single product
if ($method === 'GET') {
    if ($id) {
        $stmt = db()->prepare("SELECT p.*, c.name as `category.name`, c.slug as `category.slug`, c.accentColor as `category.accentColor` FROM Product p LEFT JOIN Category c ON p.categoryId = c.id WHERE p.id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) json_response(['error' => 'Product not found.'], 404);

        $product = $row;
        $product['features'] = json_field($row['features']);
        $product['images'] = json_field($row['images']);
        $product['isActive'] = (bool)$row['isActive'];
        $product['category'] = ['name' => $row['category.name'], 'slug' => $row['category.slug'], 'accentColor' => $row['category.accentColor']];
        unset($product['category.name'], $product['category.slug'], $product['category.accentColor']);
        json_response($product);
    }

    $category = $_GET['category'] ?? '';
    $sql = "SELECT p.*, c.id as `category.id`, c.name as `category.name`, c.slug as `category.slug` FROM Product p LEFT JOIN Category c ON p.categoryId = c.id";
    $params = [];
    if ($category) { $sql .= " WHERE p.categoryId = ?"; $params[] = $category; }
    $sql .= " ORDER BY p.createdAt DESC";

    $stmt = db()->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    $products = array_map(function($row) {
        $row['features'] = json_field($row['features']);
        $row['images'] = json_field($row['images']);
        $row['isActive'] = (bool)$row['isActive'];
        $row['category'] = ['id' => $row['category.id'], 'name' => $row['category.name'], 'slug' => $row['category.slug']];
        unset($row['category.id'], $row['category.name'], $row['category.slug']);
        return $row;
    }, $rows);

    json_response($products);
}

// POST - Create product
if ($method === 'POST') {
    $body = get_json_body();
    $id = generate_id();
    $categoryId = $body['category'] ?? $body['categoryId'] ?? '';

    $stmt = db()->prepare("INSERT INTO Product (id, name, slug, brandLine, subtitle, categoryId, purpose, howToUse, features, images, size, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
    $stmt->execute([
        $id, $body['name'], $body['slug'], $body['brandLine'] ?? '',
        $body['subtitle'] ?? '', $categoryId,
        $body['purpose'] ?? '', $body['howToUse'] ?? '',
        json_encode($body['features'] ?? []),
        json_encode($body['images'] ?? []),
        $body['size'] ?? '5 Litres',
        ($body['isActive'] ?? true) ? 1 : 0,
    ]);

    json_response(['id' => $id, 'name' => $body['name']], 201);
}

// PUT - Update product
if ($method === 'PUT' && $id) {
    $body = get_json_body();
    $sets = [];
    $params = [];

    $fields = ['name', 'slug', 'brandLine', 'subtitle', 'purpose', 'howToUse', 'size'];
    foreach ($fields as $field) {
        if (isset($body[$field])) { $sets[] = "$field = ?"; $params[] = $body[$field]; }
    }
    if (isset($body['categoryId'])) { $sets[] = "categoryId = ?"; $params[] = $body['categoryId']; }
    if (isset($body['category'])) { $sets[] = "categoryId = ?"; $params[] = $body['category']; }
    if (isset($body['features'])) { $sets[] = "features = ?"; $params[] = json_encode($body['features']); }
    if (isset($body['images'])) { $sets[] = "images = ?"; $params[] = json_encode($body['images']); }
    if (isset($body['isActive'])) { $sets[] = "isActive = ?"; $params[] = $body['isActive'] ? 1 : 0; }

    if (empty($sets)) json_response(['error' => 'No fields to update'], 400);

    $sets[] = "updatedAt = NOW()";
    $params[] = $id;

    $sql = "UPDATE Product SET " . implode(', ', $sets) . " WHERE id = ?";
    db()->prepare($sql)->execute($params);

    json_response(['success' => true]);
}

// DELETE - Delete product
if ($method === 'DELETE' && $id) {
    db()->prepare("DELETE FROM Product WHERE id = ?")->execute([$id]);
    json_response(['success' => true]);
}

json_response(['error' => 'Method not allowed'], 405);
