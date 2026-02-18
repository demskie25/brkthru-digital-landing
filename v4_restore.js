const fs = require('fs');
const { execSync } = require('child_process');

const content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Review (v4.0) | Brkthru Coaching</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=Poppins:wght@700;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; }
        .btn-premium { 
            background: #1e40af !important; color: #fff !important; 
            display: block; width: 100%; text-align: center; 
            font-weight: 800; padding: 20px; border-radius: 12px; 
            text-decoration: none; font-size: 1.1rem; text-transform: uppercase;
        }
    </style>
</head>
<body class="min-h-screen bg-slate-50">
    <header class="bg-white border-b p-4">
        <div class="max-w-5xl mx-auto flex justify-between items-center">
            <a href="index.html" class="text-blue-600 font-bold">&larr; Back to Library</a>
            <img src="images/brkthru-logo.png" class="h-6">
        </div>
    </header>
    <main class="max-w-5xl mx-auto p-8 grid md:grid-cols-2 gap-12">
        <div>
            <h1 id="display-title" class="text-4xl font-black mb-6"></h1>
            <div class="p-6 bg-slate-900 text-white rounded-3xl mb-8">
                <p class="italic text-lg">"The World Class Coach framework is a testament to the power of elite mindset training."</p>
                <p class="text-amber-500 mt-2 font-bold">— Program Manager @ Googleplex</p>
            </div>
            <div class="space-y-4">
                <h3 class="font-bold">What's Inside:</h3>
                <ul class="list-disc pl-5 text-slate-600">
                    <li>The Archer (Mindset) cognitive OS</li>
                    <li>The Scalpel (Machinery) precision tools</li>
                    <li>Digital Lifetime Access</li>
                </ul>
            </div>
        </div>
        <div class="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 h-fit sticky top-8">
            <img id="product-image" src="" class="w-32 mx-auto mb-6 shadow-2xl">
            <p id="product-price" class="text-5xl font-black text-center mb-8"></p>
            <button onclick="openCheckout()" class="btn-premium">Complete Secure Checkout</button>
            <p class="text-center text-[10px] uppercase font-bold text-slate-400 mt-6 tracking-widest">
                HitPay will open in a secure popup window.<br>Keep this page open.
            </p>
        </div>
    </main>
    <script>
        const products = {
            'bundle': { name: 'The Twin Bundle', price: 'PHP 649.00', img: 'https://img-thumb.mailinblue.com/10571077/images/content_library/original/69804bc7b474d6eac960eccf.jpeg', link: 'https://hitpay.link/n6dx11' },
            'book': { name: 'World-Class Coach', price: 'PHP 399.00', img: 'https://img-thumb.mailinblue.com/10571077/images/content_library/original/69804bc667454159afb8d237.jpeg', link: 'https://hitpay.link/mhy8sc' },
            'toolkit': { name: 'Field Toolkit', price: 'PHP 359.00', img: 'https://img-thumb.mailinblue.com/10571077/images/content_library/original/69804bc73dad4cc88c5856e7.jpeg', link: 'https://hitpay.link/9zlbvf' }
        };
        let url = '';
        const params = new URLSearchParams(window.location.search);
        const p = products[params.get('item') || 'bundle'];
        window.onload = () => {
            if(p){
                document.getElementById('display-title').innerText = p.name;
                document.getElementById('product-price').innerText = p.price;
                document.getElementById('product-image').src = p.img;
                url = p.link;
            }
        };
        function openCheckout() {
            window.open(url, 'Pay', 'width=500,height=800,top=100,left=100');
        }
    </script>
</body>
</html>`;

fs.writeFileSync('checkout.html', content, 'utf8');
fs.writeFileSync('public/checkout.html', content, 'utf8');

const log = [];
try {
    log.push(execSync('git add checkout.html public/checkout.html', {encoding:'utf8'}));
    log.push(execSync('git commit -m "FIX: Premium checkout popup flow (v4.0)"', {encoding:'utf8'}));
    log.push(execSync('git push origin master:main --force', {encoding:'utf8'}));
    log.push(execSync('git push origin master:master --force', {encoding:'utf8'}));
    fs.writeFileSync('DEPLOY_LOG_V4.txt', log.join('\n'), 'utf8');
} catch(e) {
    fs.writeFileSync('DEPLOY_LOG_V4.txt', 'FAILED: ' + e.message + '\n' + e.stderr, 'utf8');
}
