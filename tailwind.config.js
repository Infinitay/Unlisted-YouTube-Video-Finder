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
		},
	},
	scrollbar: ["rounded"],
	plugins: [require("daisyui"), require("tailwind-scrollbar-daisyui")],
	daisyui: {
		themes: ["night"]
	}
}