/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./*.html'],
	theme: {
		extend: {
			colors: {
				red: '#C73B0F',
				rose900: '#260F08',
				rose500: '#87635A',
				rose400: '#AD8A85',
				rose300: '#CAAFA7',
				rose100: '#F5EEEC',
				rose50: '#FCF8F6',
				green: '#1EA575',
			},
			fontFamily: {
				serif: ['Red Hat Text', 'serif'],
			},
		},
	},
	plugins: ['prettier-plugin-tailwindcss'],
}
