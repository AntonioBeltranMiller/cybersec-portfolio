#!/bin/bash

echo "🔧 Fixing Tailwind CSS PostCSS issue..."

echo "Step 1: Cleaning old installation..."
rm -rf node_modules .next package-lock.json

echo "Step 2: Installing correct Tailwind version..."
npm install -D tailwindcss@3.4.0 postcss@8.4.33 autoprefixer@10.4.17

echo "Step 3: Installing other dependencies..."
npm install

echo "Step 4: Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "✅ BUILD SUCCESSFUL! Ready to deploy!"
    echo "========================================"
else
    echo ""
    echo "========================================"
    echo "❌ Build still failing. Try the manual fix below."
    echo "========================================"
fi
