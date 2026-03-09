<?php
/**
 * PHP built-in server router for development.
 * Usage: php -S localhost:8000 -t . api-router.php
 *
 * Routes /api/* requests to the appropriate PHP files.
 */

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Serve static files
if (preg_match('/\.(css|js|png|jpg|jpeg|gif|svg|ico|webp)$/', $uri)) {
    return false;
}

// API routing
if (str_starts_with($uri, '/api/')) {
    $path = substr($uri, 5); // Remove '/api/'

    // Admin auth check
    if ($path === 'admin/auth/check') {
        require __DIR__ . '/api/admin/auth-check.php';
        return;
    }

    // Admin routes with ID parameter
    if (preg_match('#^admin/products/([^/]+)$#', $path, $m)) {
        $_GET['id'] = $m[1];
        require __DIR__ . '/api/admin/products.php';
        return;
    }
    if (preg_match('#^admin/contacts/([^/]+)$#', $path, $m)) {
        $_GET['id'] = $m[1];
        require __DIR__ . '/api/admin/contacts.php';
        return;
    }

    // Admin routes without ID
    $adminRoutes = ['admin/products', 'admin/categories', 'admin/contacts', 'admin/seo', 'admin/upload', 'admin/stats', 'admin/auth'];
    foreach ($adminRoutes as $route) {
        if ($path === $route) {
            require __DIR__ . '/api/' . $route . '.php';
            return;
        }
    }

    // Public routes with slug
    if (preg_match('#^products/([a-z0-9-]+)$#', $path, $m)) {
        $_GET['slug'] = $m[1];
        require __DIR__ . '/api/products.php';
        return;
    }
    if (preg_match('#^categories/([a-z0-9-]+)$#', $path, $m)) {
        $_GET['slug'] = $m[1];
        require __DIR__ . '/api/categories.php';
        return;
    }

    // Public routes
    $publicRoutes = ['products', 'categories', 'contact', 'health'];
    foreach ($publicRoutes as $route) {
        if ($path === $route) {
            require __DIR__ . '/api/' . $route . '.php';
            return;
        }
    }

    // 404 for unknown API routes
    header('Content-Type: application/json');
    http_response_code(404);
    echo json_encode(['error' => 'Not found']);
    return;
}

// For non-API requests, return false to let the built-in server handle static files
return false;
