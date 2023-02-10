/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');


module.exports = {
	content: [
		'./resources/views/**/*.edge',
		'./resources/js/**/*.jsx',
	],
	theme: {
		extend: {
			fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
		},
	},
	plugins: [require('@tailwindcss/forms')],
}
