#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# EcoGlow - DirectAdmin Deployment Build Script
# ============================================================
# Produces deploy-package.zip ready to upload to DirectAdmin.
# Usage: npm run deploy:build
# ============================================================

DEPLOY_DIR="deploy-package"
STANDALONE_DIR=".next/standalone"

echo "=== Step 1: Clean previous build artifacts ==="
rm -rf .next "$DEPLOY_DIR" deploy-package.zip

echo "=== Step 2: Install dependencies ==="
npm ci

echo "=== Step 3: Generate Prisma client (with Linux binary targets) ==="
npx prisma generate

echo "=== Step 4: Build Next.js (standalone mode) ==="
NEXT_PUBLIC_SITE_URL=https://ecoglow.co.ke \
NEXT_PUBLIC_WHATSAPP_NUMBER=254726478469 \
NEXT_PUBLIC_PHONE_PRIMARY=0111243033 \
NEXT_PUBLIC_PHONE_SECONDARY=0726478469 \
NEXT_PUBLIC_EMAIL=Ecoglowke@gmail.com \
  npx next build

echo "=== Step 5: Prepare deployment package ==="
mkdir -p "$DEPLOY_DIR"

# Copy the standalone server (includes server.js and minimal node_modules)
cp -r "$STANDALONE_DIR"/. "$DEPLOY_DIR"/

# Copy static assets — standalone does NOT include these
mkdir -p "$DEPLOY_DIR/.next/static"
cp -r .next/static/. "$DEPLOY_DIR/.next/static"/

# Copy public folder (images, favicon, etc.)
mkdir -p "$DEPLOY_DIR/public"
cp -r public/. "$DEPLOY_DIR/public"/

echo "=== Step 6: Add Passenger entry point ==="
cp app.js "$DEPLOY_DIR/app.js"

echo "=== Step 7: Verify Prisma engine binaries ==="
PRISMA_ENGINES=$(find "$DEPLOY_DIR/node_modules/.prisma/client" -name "libquery_engine-*" -o -name "query-engine-*" 2>/dev/null | head -5)
if [ -z "$PRISMA_ENGINES" ]; then
  echo "WARNING: No Prisma engine binaries found in standalone output."
  echo "Copying from local node_modules..."
  mkdir -p "$DEPLOY_DIR/node_modules/.prisma/client"
  cp node_modules/.prisma/client/libquery_engine-* "$DEPLOY_DIR/node_modules/.prisma/client/" 2>/dev/null || true
  cp node_modules/.prisma/client/schema.prisma "$DEPLOY_DIR/node_modules/.prisma/client/" 2>/dev/null || true
fi
echo "Prisma engines:"
find "$DEPLOY_DIR/node_modules/.prisma/client" -name "libquery_engine-*" -o -name "query-engine-*" 2>/dev/null || echo "  (none found — may cause issues on server)"

echo "=== Step 8: Create ZIP package ==="
cd "$DEPLOY_DIR"
zip -r ../deploy-package.zip . -x "*.map"
cd ..

echo ""
echo "=== BUILD COMPLETE ==="
echo "Upload: deploy-package.zip ($(du -sh deploy-package.zip | cut -f1))"
echo ""
echo "Next steps:"
echo "  1. Create MySQL DB in DirectAdmin and import prisma/init.sql via phpMyAdmin"
echo "  2. Import prisma/seed.sql via phpMyAdmin for sample data"
echo "  3. Upload & extract deploy-package.zip to public_html/"
echo "  4. Configure Node.js app in DirectAdmin (startup file: app.js, Node 20.18.1)"
echo "  5. Add env vars: DATABASE_URL, JWT_SECRET, NEXT_PUBLIC_SITE_URL, NODE_ENV"
echo "  6. Start the application"
