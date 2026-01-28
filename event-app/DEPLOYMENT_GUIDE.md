# BRKTHRU DIGITAL BACKEND PROXY DEPLOYMENT GUIDE

## What Was Created

We've implemented a fully automated payment system using a **serverless backend proxy** to bypass CORS restrictions when communicating with HitPay's API.

### Files Created:

1. **`/api/create-payment.js`** - Vercel serverless function that proxies requests to HitPay
2. **`vercel.json`** - Vercel configuration for API routes
3. **Updated `App.jsx`** - Frontend now calls the proxy instead of attempting direct API calls

---

## How It Works

### The Flow:

1. User clicks "Book Now" on a workshop (e.g., Brain Camp)
2. Frontend calculates the active tier: `₱25,000` (Super Early Bird)
3. Frontend sends request to `/api/create-payment` with:
    - `amount`: 25000
    - `currency`: "PHP"
    - `purpose`: "Brain Camp: High-Performance Thinking"
4. Backend proxy adds `X-BUSINESS-API-KEY` header and forwards to HitPay
5. HitPay returns a secure checkout URL
6. User is redirected to HitPay's payment page

---

## Deployment Instructions

### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (if not already installed):

    ```bash
    npm install -g vercel
    ```

2. **Deploy from your project directory**:

    ```bash
    cd c:\Users\Administrator\OneDrive\Documents\brkthru-digital-landing\event-app
    vercel
    ```

3. **Follow the prompts**:
    - Set up and deploy: `Y`
    - Which scope: Select your account
    - Link to existing project: `N` (create new)
    - Project name: `brkthru-digital-landing`
    - Directory: `./` (current directory)
    - Override settings: `N`

4. **Production deployment**:
    ```bash
    vercel --prod
    ```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your Git repository (or upload the folder)
4. Vercel will auto-detect the configuration and deploy

---

## Testing Locally

To test the serverless function locally before deploying:

```bash
# Install Vercel CLI
npm install -g vercel

# Run local dev server
vercel dev
```

This will start a local server at `http://localhost:3000` with the serverless function accessible at `http://localhost:3000/api/create-payment`.

---

## What This Automates

✅ **Dynamic Pricing**: Automatically calculates the correct tier based on the current date  
✅ **No Manual Setup**: Zero manual payment link creation in HitPay dashboard  
✅ **Single Source of Truth**: All pricing logic in `PRICING_DATA`  
✅ **Scalable**: Add new workshops or tiers in code, works immediately  
✅ **Secure**: API key stays on the backend, never exposed to browsers

---

## Direct Links (No Proxy Needed)

These products use direct HitPay checkout links and don't require the proxy:

- Twin Key Bundle: `https://hitpay.link/n6dx11`
- WCC 10th Anniversary: `https://hitpay.link/mhy8sc`
- LWCC Toolkit: `https://hitpay.link/9zlbvf`
- WCC First Edition: `https://hitpay.link/ppc7x6`

---

## Next Steps

1. **Deploy to Vercel** using the instructions above
2. **Test a workshop checkout** (e.g., Brain Camp) to verify the proxy works
3. **Monitor the Vercel logs** for any API errors

Once deployed, your payment system will be fully automated! 🚀
