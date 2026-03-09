<?php
// Load .env file
$envFile = __DIR__ . '/../.env.local';
if (!file_exists($envFile)) $envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') continue;
        if (strpos($line, '=') !== false) {
            [$key, $value] = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value, " \t\n\r\0\x0B\"'");
            if (!getenv($key)) {
                putenv("$key=$value");
                $_ENV[$key] = $value;
            }
        }
    }
}

// Database connection singleton
function db(): PDO {
    static $pdo = null;
    if ($pdo) return $pdo;

    $url = getenv('DATABASE_URL');
    if (!$url) die(json_encode(['error' => 'DATABASE_URL not configured']));

    $parts = parse_url($url);
    $host = $parts['host'] ?? 'localhost';
    $port = $parts['port'] ?? 3306;
    $dbname = ltrim($parts['path'] ?? '', '/');
    $user = $parts['user'] ?? 'root';
    $pass = $parts['pass'] ?? '';

    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}

function generate_id(): string {
    return bin2hex(random_bytes(12));
}

function json_response(array $data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function get_json_body(): array {
    return json_decode(file_get_contents('php://input'), true) ?: [];
}

function json_field($value): array {
    if (is_string($value)) return json_decode($value, true) ?: [];
    if (is_array($value)) return $value;
    return [];
}

// Session-based admin auth
function require_admin(): void {
    start_session();
    if (empty($_SESSION['admin_id'])) {
        json_response(['error' => 'Unauthorized'], 401);
    }
}

function start_session(): void {
    if (session_status() === PHP_SESSION_NONE) {
        session_set_cookie_params([
            'httponly' => true,
            'samesite' => 'Lax',
            'path' => '/',
        ]);
        session_start();
    }
}

// CORS headers for development
header('Content-Type: application/json');
if (getenv('NODE_ENV') !== 'production') {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? 'http://localhost:5173';
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}
