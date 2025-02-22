/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./*.html', './js/*.js'],

	theme: {
		extend: {
			safelist: [
				'bg-slate-300',
				'bg-rose50',
				'bg-red',
				'flex',
				'flex-col',
				'flex-row',
				'items-center',
				'justify-between',
				'justify-center',
				'gap-2',
				'gap-3',
				'mb-4',
				'mb-6',
				'mt-5',
				'my-8',
				'my-4',
				'p-3',
				'p-4',
				'text-rose800',
				'text-rose900',
				'text-rose500',
				'text-red',
				'text-sm',
				'text-md',
				'text-2xl',
				'text-white',
				'font-thin',
				'font-semibold',
				'font-bold',
				'border-rose100',
				'border-b',
				'rounded-md',
				'rounded-full',
				'w-full',
				'inline-block',
				'cursor-pointer',
				'duration-300',
				'group',
				'group-hover:fill-black',
				'hover:fill-black',
				'pointer-events-none',
				'pointer-events-auto',
				'border-b',
				'border-rose100',
			],

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
