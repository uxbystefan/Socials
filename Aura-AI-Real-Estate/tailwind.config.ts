import { join } from 'path';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {
			colors: {
				lux: {
					background: '#0B1120',
					surface: '#151B2E',
					glass: 'rgba(255,255,255,0.05)',
					textPrimary: '#F1F1F1',
					textSecondary: '#9A9A9A',
					accent: '#C6A96B',
					divider: 'rgba(255,255,255,0.12)'
				}
			},
            fontFamily: {
                heading: ['Playfair Display', 'serif'],
                body: ['Inter', 'sans-serif'],
            }
		},
	},
	plugins: [
		skeleton({
			themes: { preset: [ "skeleton" ] }
		})
	]
} satisfies Config;

export default config;
