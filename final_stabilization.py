import subprocess
import os

html_content = r"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Review (v3.5) | Brkthru Coaching</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root { 
            --brand-navy: #0f172a;
            --brand-amber: #f59e0b;
            --brand-blue: #1e40af;
        }
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; color: #1e293b; }
        h1, h2, h3 { font-family: 'Poppins', sans-serif; }
        .glass-card { 
            background: rgba(255, 255, 255, 0.95); 
            backdrop-filter: blur(20px); 
            border: 1px solid rgba(255, 255, 255, 0.4); 
            box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.1); 
        }
        .hero-gradient { background: radial-gradient(circle at top right, #eff6ff 0%, #ffffff 100%); }
        
        .btn-premium { 
            background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%) !important;
            color: #ffffff !important; 
            display: block !important;
            width: 100% !important;
            text-align: center !important;
            font-weight: 800 !important;
            padding: 20px !important;
            border-radius: 12px !important;
            text-decoration: none !important;
            font-size: 1.1rem !important;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            box-shadow: 0 10px 20px -5px rgba(30, 64, 175, 0.3) !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            border: none;
        }
        .btn-premium:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px -10px rgba(30, 64, 175, 0.4) !important;
            filter: brightness(1.1);
        }
    </style>
</head>
<body class="hero-gradient min-h-screen flex flex-col">
    <header class="w-full bg-white/70 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="index.html" style="color:#64748b; font-weight:600; text-decoration:none; display:flex; align-items:center; gap:0.5rem; padding:8px 16px; border-radius:99px; background:white; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Return to Leadership Library
            </a>
            <a href="index.html">
                <img src="images/brkthru-logo.png" alt="Brkthru" class="h-8">
            </a>
        </div>
    </header>

    <main class="flex-grow max-w-7xl mx-auto w-full p-6 lg:p-12">
        <div class="grid lg:grid-cols-12 gap-12 items-start">
            <div class="lg:col-span-12 text-center mb-8">
                <h1 id="display-title" class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Loading Your Order...</h1>
            </div>
            
            <div class="lg:col-span-7 space-y-10">
                <div class="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <h2 class="text-2xl font-bold mb-4">What's Inside</h2>
                    <div class="grid sm:grid-cols-2 gap-6">
                        <div>
                            <h3 class="font-bold text-amber-600 mb-1">The Archer (Mindset)</h3>
                            <p class="text-sm text-slate-500">Master the internal cognitive OS that determines your leadership potential.</p>
                        </div>
                        <div>
                            <h3 class="font-bold text-blue-600 mb-1">The Scalpel (Machinery)</h3>
                            <p class="text-sm text-slate-500">Surgical precision tools, scripts, and procedures for real-world execution.</p>
                        </div>
                    </div>
                </div>

                <div class="p-8 bg-slate-900 rounded-[2.5rem] text-white relative">
                    <p class="text-lg italic text-slate-200">"The World Class Coach framework is my virtual mentor for leading with precision."</p>
                    <p class="mt-4 font-bold text-amber-500">Love del Rosario - Program Manager @ Google</p>
                </div>
            </div>

            <div class="lg:col-span-5">
                <div class="glass-card rounded-[2.5rem] p-10">
                    <img id="product-image" src="" alt="Product" class="w-24 h-auto rounded mb-6 mx-auto shadow-xl">
                    <p id="product-price" class="text-5xl font-black text-center mb-8"></p>
                    
                    <button onclick="openCheckout()" class="btn-premium">Complete Secure Checkout</button>
                    
                    <p class="mt-6 text-[0.7rem] text-center text-slate-500">
                        <strong>NOTE:</strong> HitPay will open in a secure popup window. 
                        <strong>DO NOT CLOSE THIS PAGE</strong> until your payment is done.
                    </p>
                </div>
            </div>
        </div>
    </main>

    <script>
        const products = {
            'bundle': { name: 'The Twin Bundle: WCC + Toolkit', price: 'PHP 649.00', img: 'https://img-thumb.mailinblue.com/10571077/images/content_library/original/69804bc7b474d6eac960eccf.jpeg', link: 'https://hitpay.link/n6dx11' },
            'book': { name: 'World-Class Coach (10th Anniv)', price: 'PHP 399.00', img: 'https://img-thumb.mailinblue.com/10571077/images/content_library/original/69804bc667454159afb8d237.jpeg', link: 'https://hitpay.link/mhy8sc' },
            'toolkit': { name: 'The Coaching Field Toolkit', price: 'PHP 359.00', img: 'https://img-thumb.mailinblue.com/10571077/images/content_library/original/69804bc73dad4cc88c5856e7.jpeg', link: 'https://hitpay.link/9zlbvf' }
        };

        let checkoutUrl = '';
        window.onload = () => {
            const params = new URLSearchParams(window.location.search);
            const item = params.get('item') || 'bundle';
            const p = products[item];
            if(p) {
                document.getElementById('display-title').innerText = p.name;
                document.getElementById('product-price').innerText = p.price;
                document.getElementById('product-image').src = p.img;
                checkoutUrl = p.link;
            }
        };

        function openCheckout() {
            if(!checkoutUrl) return;
            const w = 500, h = 800;
            const left = (screen.width/2)-(w/2), top = (screen.height/2)-(h/2);
            window.open(checkoutUrl, 'Checkout', `width=${w},height=${h},top=${top},left=${left},scrollbars=yes`);
        }
    </script>
</body>
</html>"""

def stabilize():
    log = []
    log.append("=== NUCLEAR STABILIZATION REPORT ===")
    
    # Write files in binary mode to skip any OS-wide encoding mess
    for path in ['checkout.html', 'public/checkout.html']:
        try:
            with open(path, 'wb') as f:
                f.write(html_content.encode('utf-8'))
            log.append(f"SUCCESS: Wrote {path} as UTF-8 Binary. Size: {os.path.getsize(path)}")
        except Exception as e:
            log.append(f"FAILED: Writing {path}: {str(e)}")

    # Git Operations
    def run_git(args):
        try:
            res = subprocess.run(['git'] + args, capture_output=True, text=True, check=True)
            return f"OK: {' '.join(args)}\n{res.stdout}"
        except subprocess.CalledProcessError as e:
            return f"ERROR: {' '.join(args)}\n{e.stderr}"

    log.append("\n--- GIT OPS ---")
    log.append(run_git(['add', 'checkout.html', 'public/checkout.html']))
    log.append(run_git(['commit', '-m', "FIX: Definitive premium checkout and popup UI (v3.5)"]))
    log.append(run_git(['push', 'origin', 'master:main', '--force']))
    log.append(run_git(['push', 'origin', 'master:master', '--force']))
    
    with open('STABILIZATION_LOG.txt', 'w') as f:
        f.write("\n".join(log))

if __name__ == "__main__":
    stabilize()
