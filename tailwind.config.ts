//
//
// // // tailwind.config.js
// // module.exports = {
// //     theme: {
// //         extend: {
// //             colors: {
// //                 background: {
// //                     DEFAULT: '#FFFFFF', // White
// //                     dark: '#0F172A', // Dark mode background
// //                 },
// //                 text: {
// //                     DEFAULT: '#1E293B', // Dark gray for text
// //                     light: '#64748B', // Lighter text
// //                     dark: '#F8FAFC', // Light text for dark mode
// //                 },
// //                 primary: {
// //                     DEFAULT: '#2563EB', // Vibrant blue
// //                     light: '#3B82F6',
// //                     dark: '#1D4ED8',
// //                 },
// //             },
// //         },
// //     },
// //     darkMode: 'class', // Enable class-based dark mode
// // };
//
//
// // // tailwind.config.js
// // module.exports = {
// //     darkMode: 'class', // Enable class-based dark mode
// //     theme: {
// //         extend: {
// //             colors: {
// //                 background: {
// //                     DEFAULT: '#F8FAFC', // Light Gray for light mode
// //                     dark: '#0F172A', // Navy Blue for dark mode
// //                 },
// //                 text: {
// //                     DEFAULT: '#1E293B', // Dark Gray for light mode
// //                     light: '#64748B', // Lighter Gray for secondary text
// //                     dark: '#F8FAFC', // Light Gray for dark mode
// //                 },
// //                 primary: {
// //                     DEFAULT: '#2563EB', // Vibrant Blue for light mode
// //                     light: '#3B82F6', // Lighter Blue for dark mode
// //                     dark: '#1D4ED8', // Darker Blue for hover states
// //                 },
// //                 secondary: {
// //                     DEFAULT: '#64748B', // Gray for light mode
// //                     light: '#94A3B8', // Lighter Gray for dark mode
// //                     dark: '#475569', // Darker Gray for hover states
// //                 },
// //                 accent: {
// //                     DEFAULT: '#DB2777', // Pink for light mode
// //                     light: '#EC4899', // Lighter Pink for dark mode
// //                     dark: '#BE185D', // Darker Pink for hover states
// //                 },
// //                 success: '#10B981', // Green
// //                 warning: '#F59E0B', // Yellow
// //                 error: '#EF4444', // Red
// //             },
// //             fontFamily: {
// //                 sans: ['Inter', 'sans-serif'], // For UI elements
// //                 serif: ['Merriweather', 'serif'], // For article content
// //             },
// //         },
// //     },
// //     plugins: [require('@tailwindcss/typography')],
// // };
//
//
// // tailwind.config.js
// module.exports = {
//     darkMode: 'class', // Enable class-based dark mode
//     content: [ "./src/**/*.{js,ts,jsx,tsx,mdx}",],
//     theme: {
//         extend: {
//             backgroundColors: {
//                 background: {
//                     DEFAULT: '#F8FAFC', // Light Gray for light mode
//                     dark: '#0F172A', // Navy Blue for dark mode
//                 },
//                 text: {
//                     DEFAULT: '#1E293B', // Dark Gray for light mode
//                     light: '#64748B', // Lighter Gray for secondary text
//                     dark: '#F8FAFC', // Light Gray for dark mode
//                 },
//                 primary: {
//                     DEFAULT: '#2563EB', // Vibrant Blue for light mode
//                     light: '#3B82F6', // Lighter Blue for dark mode
//                     dark: '#1D4ED8', // Darker Blue for hover states
//                 },
//                 secondary: {
//                     DEFAULT: '#64748B', // Gray for light mode
//                     light: '#94A3B8', // Lighter Gray for dark mode
//                     dark: '#475569', // Darker Gray for hover states
//                 },
//                 accent: {
//                     DEFAULT: '#DB2777', // Pink for light mode
//                     light: '#EC4899', // Lighter Pink for dark mode
//                     dark: '#BE185D', // Darker Pink for hover states
//                 },
//                 success: '#10B981', // Green
//                 warning: '#F59E0B', // Yellow
//                 error: '#EF4444', // Red
//             },
//             fontFamily: {
//                 sans: ['Inter', 'sans-serif'], // For UI elements
//                 serif: ['Merriweather', 'serif'], // For article content
//             },
//         },
//     },
//     plugins: [require('@tailwindcss/typography')],
// };




/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Enables class-based dark mode
    theme: {
        extend: {
            fontFamily: {
                sans: ['Manrope', 'sans-serif'],
            },
        }
    },
    plugins: [],
};
