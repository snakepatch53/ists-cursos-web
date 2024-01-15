/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                title: ["title", "sans-serif"],
                title2: ["title2", "sans-serif"],
                content: ["content", "sans-serif"],
                content2: ["content2", "sans-serif"],
            },
        },
    },
    plugins: [],
};
