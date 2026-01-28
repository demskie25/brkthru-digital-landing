/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
            },
            colors: {
                brand: {
                    900: '#0f172a', // slate-900
                    800: '#1e293b', // slate-800
                    50: '#f8fafc',  // slate-50
                },
                accent: {
                    500: '#f59e0b', // amber-500
                    600: '#d97706', // amber-600
                }
            }
        },
    },
    plugins: [],
}
