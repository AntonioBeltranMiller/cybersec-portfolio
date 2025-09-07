#!/bin/bash

echo "🔧 Fixing project structure..."
echo "================================"

# 1. Remove the src directory (we'll use app/ at root level)
echo "Step 1: Removing duplicate src/app directory..."
if [ -d "src" ]; then
    rm -rf src
    echo "✅ Removed src directory"
else
    echo "⏭️  No src directory to remove"
fi

# 2. Remove duplicate config files
echo ""
echo "Step 2: Cleaning duplicate config files..."

# Keep .js versions, remove .ts/.mjs versions
if [ -f "next.config.ts" ]; then
    rm next.config.ts
    echo "✅ Removed next.config.ts (keeping .js)"
fi

if [ -f "postcss.config.mjs" ]; then
    rm postcss.config.mjs
    echo "✅ Removed postcss.config.mjs (keeping .js)"
fi

if [ -f "eslint.config.mjs" ]; then
    rm eslint.config.mjs
    echo "✅ Removed eslint.config.mjs (keeping .json)"
fi

# 3. Ensure all directories exist
echo ""
echo "Step 3: Ensuring proper directory structure..."
mkdir -p app/blog/incident-response
mkdir -p app/projects/[slug]
mkdir -p components
mkdir -p lib
mkdir -p public/images/projects
echo "✅ Directory structure verified"

# 4. Create next-env.d.ts if it doesn't exist
echo ""
echo "Step 4: Creating TypeScript declarations..."
if [ ! -f "next-env.d.ts" ]; then
    cat > next-env.d.ts << 'EOF'
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.
EOF
    echo "✅ Created next-env.d.ts"
else
    echo "⏭️  next-env.d.ts already exists"
fi

# 5. Update tailwind.config.js content paths
echo ""
echo "Step 5: Updating Tailwind config..."
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
EOF
echo "✅ Updated tailwind.config.js"

# 6. Update next.config.js
echo ""
echo "Step 6: Updating Next.js config..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
EOF
echo "✅ Updated next.config.js"

# 7. Update postcss.config.js
echo ""
echo "Step 7: Updating PostCSS config..."
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF
echo "✅ Updated postcss.config.js"

# 8. Verify file structure
echo ""
echo "Step 8: Verifying file structure..."
echo ""
echo "Current structure:"
echo "=================="

# Check for required files
files_good=true

echo "Config files:"
[ -f "next.config.js" ] && echo "✅ next.config.js" || { echo "❌ next.config.js missing"; files_good=false; }
[ -f "postcss.config.js" ] && echo "✅ postcss.config.js" || { echo "❌ postcss.config.js missing"; files_good=false; }
[ -f "tailwind.config.js" ] && echo "✅ tailwind.config.js" || { echo "❌ tailwind.config.js missing"; files_good=false; }
[ -f "tsconfig.json" ] && echo "✅ tsconfig.json" || { echo "❌ tsconfig.json missing"; files_good=false; }
[ -f "package.json" ] && echo "✅ package.json" || { echo "❌ package.json missing"; files_good=false; }

echo ""
echo "App files:"
[ -f "app/layout.tsx" ] && echo "✅ app/layout.tsx" || { echo "❌ app/layout.tsx missing"; files_good=false; }
[ -f "app/page.tsx" ] && echo "✅ app/page.tsx" || { echo "❌ app/page.tsx missing"; files_good=false; }
[ -f "app/globals.css" ] && echo "✅ app/globals.css" || { echo "❌ app/globals.css missing"; files_good=false; }

echo ""
echo "Component files:"
[ -f "components/Navigation.tsx" ] && echo "✅ components/Navigation.tsx" || echo "⚠️  components/Navigation.tsx missing"
[ -f "components/Hero.tsx" ] && echo "✅ components/Hero.tsx" || echo "⚠️  components/Hero.tsx missing"

# 9. Final status
echo ""
echo "================================"
if [ "$files_good" = true ]; then
    echo "✅ Project structure fixed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm install"
    echo "2. Run: npm run build"
    echo "3. If build succeeds, deploy to Vercel"
else
    echo "⚠️  Some files may be missing, but structure is fixed."
    echo "Run 'npm run build' to see if there are any remaining issues."
fi
echo "================================"
