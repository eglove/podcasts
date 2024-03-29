import {nextui} from '@nextui-org/react'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
      'm-4', 'max-w-7xl', 'mx-auto'
  ],
  theme: {},
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          background: '#334155',
          primary: '#c2410c',
          secondary: '#0369a1',
          foreground: '#ffffff',
          danger: '#fda4af',
        }
      }
    }
  })]
};
export default config;
