const fs = require('fs');
const content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Review | Brkthru Coaching</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Poppins:wght@700;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root { --brkthru-blue: #1e40af; }
        body { font-family: 'Inter', sans-serif; }
        h1, h2 { font-family: 'Poppins', sans-serif; }
        .glass-card { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1); }
        .hero-gradient { background: radial-gradient(circle at top right, #eff6ff 0%, #ffffff 100%); }
        
        .btn-premium { 
            background-color: #1e40af !important; 
            color: #ffffff !important; 
            display: block !important;
            width: 100% !important;
            text-align: center !important;
            font-weight: 800 !important;
            padding: 24px !important;
            border-radius: 16px !important;
            text-decoration: none !important;
            font-size: 1.25rem !important;
            box-shadow: 0 10px 20px -5px rgba(30, 64, 175, 0.4) !important;
            transition: all 0.3s ease;
        }
        .btn-premium:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px -10px rgba(30, 64, 175, 0.5) !important;
            background-color: #1d4ed8 !important;
        }
        .back-link {
            color: #64748b;
            font-size: 0.875rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: color 0.2s;
            text-decoration: none;
        }
        .back-link:hover {
            color: #1e40af;
        }
    </style>
</head>
<body class="hero-gradient min-h-screen flex flex-col">
    <header class="w-full bg-white/70 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="index.html" class="back-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Back to Leadership Library
            </a>
            <a href="https://brkthrucoaching.com">
                <img src="https://img-thumb.mailinblue.com/10571077/images/content_library/original/69804be067454159afb8d239.jpeg" alt="Brkthru" class="h-8">
            </a>
        </div>
    </header>
    <main class="flex-grow flex items-center justify-center p-6">
        <div id="checkout-card" class="max-w-2xl w-full glass-card rounded-[3rem] overflow-hidden p-12">
            <div class="flex flex-col md:flex-row gap-10 items-center">
                <div class="relative w-48 shrink-0">
                    <img id="product-image" src="" alt="Book" class="w-full h-auto rounded-xl shadow-2xl border border-gray-100">
                </div>
                <div class="flex-1">
                    <h1 id="display-title" class="text-3xl font-black text-gray-900 leading-tight mb-3"></h1>
                    <p class="text-gray-500 font-medium">Digital Ebook Edition + Instant Access</p>
                </div>
            </div>
            
            <div class="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
                <div>
                    <p class="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Total Investment</p>
                    <p id="product-price" class="text-4xl font-black text-gray-900"></p>
                </div>
            </div>

            <!-- BUTTON: FORCED WHITE TEXT ON BLUE, OPENS IN NEW TAB -->
            <a id="pay-link" href="" target="_blank" rel="noopener noreferrer" class="btn-premium mt-10">
               Complete Secure Checkout
            </a>
            
            <p class="text-center text-gray-400 text-[10px] mt-6 font-bold uppercase tracking-widest">
               Encrypted Payment Gateway
            </p>
        </div>
    </main>

    <script>
        const products = {
            'bundle': { 
                name: 'The Twin Bundle: WCC + Toolkit', 
                price: 'PHP 649.00', 
                img: 'https://img-thumb.mailinblue.com/10571077/images/content_library/original/69804bc7b474d6eac960eccf.jpeg', 
                link: 'https://hitpay.link/n6dx11' 
            },
            'book': { 
                name: 'World-Class Coach (10th Anniv)', 
                price: 'PHP 399.00', 
                img: 'https://img-thumb.mailinblue.com/10571077/images/content_library/original/69804bc667454159afb8d237.jpeg', 
                link: 'https://hitpay.link/mhy8sc' 
            },
            'toolkit': { 
                name: 'The Coaching Field Toolkit', 
                price: 'PHP 359.00', 
                img: 'https://img-thumb.mailinblue.com/10571077/images/content_library/original/69804bc73dad4cc88c5856e7.jpeg', 
                link: 'https://hitpay.link/9zlbvf' 
            }
        };
        window.onload = () => {
            const params = new URLSearchParams(window.location.search);
            const itemKey = params.get('item') || 'bundle';
            const product = products[itemKey];
            if (product) {
                document.getElementById('display-title').innerText = product.name;
                document.getElementById('product-price').innerText = product.price;
                document.getElementById('product-image').src = product.img;
                document.getElementById('pay-link').href = product.link;
            }
        };
    </script>
</body>
</html>`;
fs.writeFileSync('checkout.html', content, { encoding: 'utf8' });
fs.writeFileSync('public/checkout.html', content, { encoding: 'utf8' });
console.log('SUCCESS: Written checkout.html and public/checkout.html as UTF-8');
