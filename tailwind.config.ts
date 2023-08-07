import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#9705EA',
        background: '#030712',
        'surface-primary': '#111827',
        'surface-secondary': '#1F2937',
        'surface-tertiary': '#374151',
        'video-background': '#000000',
        'text-primary': '#F9FAFB',
        'text-secondary': '#E5E7EB',
        'text-tertiary': '#9CA3AF'
      }
    },
  },
  plugins: [],
}
export default config
