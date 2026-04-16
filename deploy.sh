#!/bin/bash

# Usage: ./deploy.sh "your commit message"

MSG=${1:-"feat: update"}

echo "🔀 Switching to dev..."
git checkout dev

echo "📦 Staging all changes..."
git add .

echo "💾 Committing: $MSG"
git commit -m "$MSG"

echo "🚀 Pushing to dev..."
git push origin dev

echo "🔀 Switching to main..."
git checkout main

echo "🔗 Merging dev into main..."
git merge dev

echo "🚀 Pushing to main..."
git push origin main

echo "🏗️  Building for production..."
ng build --base-href "/Jaegar-App/"

echo "🌍 Deploying to GitHub Pages..."
npx angular-cli-ghpages --dir=dist/jaegar_app/browser

echo "🔀 Switching back to dev..."
git checkout dev

echo "✅ Done! Live at https://aafridishaikh-stack.github.io/Jaegar-App/"
