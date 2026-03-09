#!/usr/bin/env bash
set -euo pipefail

echo "=== EcoGlow Deploy Build ==="

# 1. Install dependencies and build React frontend
echo "Installing dependencies..."
npm ci

echo "Building React frontend..."
npx tsc -b
npx vite build

# 2. Copy PHP API + assets into dist
echo "Preparing deploy package in dist/..."
cp -r api dist/api
cp -r public/images dist/images 2>/dev/null || true
cp public/favicon.svg dist/ 2>/dev/null || true

# 3. Create root .htaccess for SPA + PHP API routing
cat > dist/.htaccess << 'HTACCESS'
RewriteEngine On
RewriteBase /

# Ensure correct MIME types for assets
AddType application/javascript .js .mjs
AddType text/css .css
AddType image/svg+xml .svg

# Static assets - serve directly (stop rewriting)
RewriteRule ^assets/ - [L]
RewriteRule ^images/ - [L]
RewriteRule \.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot|map)$ - [L]

# API routes - forward to PHP
RewriteRule ^api/admin/auth/check$ api/admin/auth-check.php [L,QSA]
RewriteRule ^api/admin/products/([^/]+)$ api/admin/products.php?id=$1 [L,QSA]
RewriteRule ^api/admin/contacts/([^/]+)$ api/admin/contacts.php?id=$1 [L,QSA]
RewriteRule ^api/admin/(.*)$ api/admin/$1.php [L,QSA]
RewriteRule ^api/products/([a-z0-9-]+)$ api/products.php?slug=$1 [L,QSA]
RewriteRule ^api/categories/([a-z0-9-]+)$ api/categories.php?slug=$1 [L,QSA]
RewriteRule ^api/(.*)$ api/$1.php [L,QSA]

# Don't rewrite existing files/directories
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# SPA fallback - all other routes serve index.html
RewriteRule ^ index.html [L]
HTACCESS

# 4. Create .env.example
cat > dist/.env.example << 'ENV'
DATABASE_URL=mysql://user:password@localhost:3306/ecoglow
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=254726478469
NEXT_PUBLIC_PHONE_PRIMARY=0111243033
NEXT_PUBLIC_PHONE_SECONDARY=0726478469
NEXT_PUBLIC_EMAIL=Ecoglowke@gmail.com
NODE_ENV=production
ENV

# 5. Create tarball
echo "Creating deploy archive..."
tar -czf ecoglow-deploy.tar.gz -C dist .

echo ""
echo "=== Build complete! ==="
echo "Upload ecoglow-deploy.tar.gz to your PHP hosting."
echo ""
echo "On the server:"
echo "  cd public_html"
echo "  tar -xzf ecoglow-deploy.tar.gz"
echo "  cp .env.example .env  # then edit with your DB credentials"
echo ""
echo "Requirements: PHP 8.0+, mod_rewrite enabled"
