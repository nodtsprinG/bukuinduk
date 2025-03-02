/** @type {import('tailwindcss').Config} */
export const content = [
    "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
    extend: {
        backgroundColor: {
            'homepage': '#ACABAF', // Menggunakan backgroundColor untuk warna latar belakang
        },
        fontFamily: {
            'body': ['Helvetica', 'Arial', 'sans-serif'],
            'header': ['Coolvetica', 'Arial', 'sans-serif'] // Pastikan font Coolvetica tersedia
        }
    },
};
export const plugins = [];