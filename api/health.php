<?php
require_once __DIR__ . '/config.php';

$status = ['status' => 'ok', 'timestamp' => date('c')];

try {
    db()->query("SELECT 1");
    $status['database'] = 'connected';
} catch (Exception $e) {
    $status['database'] = 'error';
    $status['status'] = 'degraded';
    http_response_code(503);
}

json_response($status);
