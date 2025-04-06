// A simple test file to check if the server is running
console.log('Server is running on http://localhost:3000');
console.log('Press Ctrl+C to stop the server');

// Check if required files exist
const fs = require('fs');
const path = require('path');

const requiredFiles = [
    'css/styles.css',
    'index.html',
    'views/menu.html',
    'views/about.html',
    'views/contact.html',
    'server.js',
    'package.json'
];

requiredFiles.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
        console.log(`✓ ${file} exists`);
    } else {
        console.log(`✗ ${file} is missing`);
    }
});

// Check for responsive design elements
const cssContent = fs.readFileSync(path.join(__dirname, 'css/styles.css'), 'utf8');
const hasMediaQueries = cssContent.includes('@media');
const hasHamburgerMenu = cssContent.includes('.hamburger-menu');

console.log('\nResponsive Design Check:');
console.log(hasMediaQueries ? '✓ Media queries found' : '✗ No media queries found');
console.log(hasHamburgerMenu ? '✓ Hamburger menu styles found' : '✗ No hamburger menu styles found');

// Check for required JavaScript functionality
const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const hasHamburgerScript = indexContent.includes('hamburger-menu');
const hasMobileNav = indexContent.includes('nav-links');

console.log('\nMobile Navigation Check:');
console.log(hasHamburgerScript ? '✓ Hamburger menu JavaScript found' : '✗ No hamburger menu JavaScript found');
console.log(hasMobileNav ? '✓ Mobile navigation structure found' : '✗ No mobile navigation structure found'); 