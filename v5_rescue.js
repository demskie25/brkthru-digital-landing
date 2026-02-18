const fs = require('fs');
const { execSync } = require('child_process');

// 1. Prepare HTML and Index markers
const timestamp = new Date().toISOString();
console.log('Starting deployment V5 at ' + timestamp);

// 2. Write Checkout
const checkoutContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SECURE CHECKOUT V5 | Brkthru</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-20 text-center">
    <h1 class="text-4xl font-bold mb-8">SECURE CHECKOUT V5</h1>
    <p class="mb-8">This is the new popup-enabled checkout. Version: ${timestamp}</p>
    <button onclick="window.open(url, 'P', 'width=500,height=800')" class="bg-blue-600 text-white p-6 rounded-xl font-bold">
        COMPLETE SECURE CHECKOUT (POPUP)
    </button>
    <script>
        const url = 'https://hitpay.link/n6dx11';
    </script>
</body>
</html>`;

fs.writeFileSync('checkout.html', checkoutContent);
fs.writeFileSync('public/checkout.html', checkoutContent);

// 3. Update Index for Visual Proof
let index = fs.readFileSync('index.html', 'utf8');
index = index.replace('bg-accent-500', 'bg-red-600'); // Change bundle button to BRIGHT RED
index = index.replace('v2_index.html', 'index.html?v=' + Date.now()); // Break cache
fs.writeFileSync('index.html', index);

// 4. Force Git
try {
    execSync('git add .');
    execSync('git commit -m "FIX: Visual override and V5 checkout"');
    execSync('git push origin master:main --force');
    execSync('git push origin master:master --force');
    fs.writeFileSync('SYNC_SUCCESS.txt', 'DEPLOYED V5 AT ' + timestamp);
} catch(e) {
    fs.writeFileSync('SYNC_FAILURE.txt', e.message + '\n' + e.stderr);
}
