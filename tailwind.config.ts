import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-50": "#EDF0FD",
        "primary-100": "#C7D2F8",
        "primary-500": "#2F56E4",
        "primary-950": "#071136",
      },
    },
  },
  plugins: [],
};
export default config;
