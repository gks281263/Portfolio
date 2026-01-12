import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distPath, 'index.html');
const notFoundPath = path.join(distPath, '404.html');

// Ensure dist directory exists
if (!fs.existsSync(distPath)) {
  console.error('Error: dist directory does not exist. Please run build first.');
  process.exit(1);
}

// Copy index.html to 404.html for GitHub Pages SPA routing
if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log('✅ Successfully created 404.html for SPA routing');
} else {
  console.error('Error: index.html not found in dist directory');
  process.exit(1);
}
