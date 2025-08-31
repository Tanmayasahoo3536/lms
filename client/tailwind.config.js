/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'course-details-heading-small': ['26px', '36px'],
        'course-details-heading-large': ['64px', '72px'],
        'home-heading-small': ['280px', '340px'],
        'home-heading-large': ['480px', '560px'],
        'default': ['15px', '21px'],
      },
    },
  },
  plugins: [],

}
