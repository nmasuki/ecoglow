<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$slug = $_GET['slug'] ?? null;

if ($method === 'GET') {
    if ($slug) {
        // Single product by slug
        $stmt = db()->prepare("SELECT p.*, c.name as `category.name`, c.slug as `category.slug`, c.accentColor as `category.accentColor`, c.description as `category.description`, c.id as `category.id` FROM Product p LEFT JOIN Category c ON p.categoryId = c.id WHERE p.slug = ? AND p.isActive = 1");
        $stmt->execute([$slug]);
        $row = $stmt->fetch();
        if (!$row) json_response(['error' => 'Product not found'], 404);

        $product = format_product($row);
        json_response($product);
    } else {
        // List products
        $category = $_GET['category'] ?? '';
        $featured = $_GET['featured'] ?? '';
        $limit = intval($_GET['limit'] ?? 0);

        $sql = "SELECT p.*, c.name as `category.name`, c.slug as `category.slug`, c.accentColor as `category.accentColor`, c.id as `category.id` FROM Product p LEFT JOIN Category c ON p.categoryId = c.id WHERE p.isActive = 1";
        $params = [];

        if ($category) {
            $sql .= " AND c.slug = ?";
            $params[] = $category;
        }

        $sql .= " ORDER BY p.createdAt DESC";

        if ($limit > 0) {
            $sql .= " LIMIT $limit";
        }

        $stmt = db()->prepare($sql);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();

        $products = array_map('format_product', $rows);
        json_response($products);
    }
}

json_response(['error' => 'Method not allowed'], 405);

function format_product(array $row): array {
    return [
        'id' => $row['id'],
        'name' => $row['name'],
        'slug' => $row['slug'],
        'brandLine' => $row['brandLine'],
        'subtitle' => $row['subtitle'],
        'categoryId' => $row['categoryId'],
        'purpose' => $row['purpose'],
        'howToUse' => $row['howToUse'],
        'features' => json_field($row['features']),
        'images' => json_field($row['images']),
        'size' => $row['size'],
        'isActive' => (bool)$row['isActive'],
        'category' => isset($row['category.id']) ? [
            'id' => $row['category.id'],
            'name' => $row['category.name'],
            'slug' => $row['category.slug'],
            'accentColor' => $row['category.accentColor'],
            'description' => $row['category.description'] ?? '',
        ] : null,
    ];
}
