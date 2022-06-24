module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	safelist: [
		{
			pattern: /./
		},
	],
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["night"],
	}
}