import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors';
import tailgrids from 'tailgrids/plugin';

const config: Config = {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				...colors
			},
			fontFamily: {
				sans: ['Roboto', 'sans-serif']
			}
		},
	},
	variants: {
		extend: {
			backgroundColor: ['print'],
			textColor: ['print'],
			borderColor: ['print'],
		},
	},
	plugins: [tailgrids],
};
export default config;
