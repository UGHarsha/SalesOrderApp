/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0f172a', // slate-900
                    hover: '#334155',   // slate-700
                    light: '#cbd5e1',   // slate-300
                },
                secondary: {
                    DEFAULT: '#f8fafc', // slate-50
                    hover: '#f1f5f9',   // slate-100
                    border: '#94a3b8',  // slate-400
                },
                danger: {
                    DEFAULT: '#ef4444', // red-500
                    hover: '#dc2626',   // red-600
                },
                surface: '#ffffff',
                background: '#f8fafc',
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }
        },
    },
    plugins: [],
}