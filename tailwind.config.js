module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	safelist: [
		{
			pattern: /./
		},
	],
	theme: {
		extend: {
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
			},
			screens: {
				mx2xl: { 'max': '1535px' },
				// => @media (max-width: 1535px) { ... }

				mxxl: { 'max': '1279px' },
				// => @media (max-width: 1279px) { ... }

				mxlg: { 'max': '1023px' },
				// => @media (max-width: 1023px) { ... }

				mxmd: { 'max': '767px' },
				// => @media (max-width: 767px) { ... }

				mxsm: { 'max': '639px' },
				// => @media (max-width: 639px) { ... }
			}
		},
	},
	scrollbar: ["rounded"],
	plugins: [require("daisyui"), require("tailwind-scrollbar-daisyui")],
	daisyui: {
		themes: ["night"]
	}
}