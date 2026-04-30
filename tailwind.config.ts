import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-strong": "rgb(var(--color-surface-strong) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        outline: "rgb(var(--color-outline) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-soft": "rgb(var(--color-accent-soft) / <alpha-value>)",
        rose: "rgb(var(--color-rose) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
      },
      borderRadius: {
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
      },
      boxShadow: {
        crystal: "var(--shadow-crystal)",
        soft: "var(--shadow-soft)",
      },
      fontFamily: {
        body: ["var(--font-body)"],
        display: ["var(--font-display)"],
      },
      backgroundImage: {
        aurora:
          "radial-gradient(circle at top left, rgb(var(--color-accent-soft) / 0.5), transparent 38%), radial-gradient(circle at top right, rgb(var(--color-rose) / 0.22), transparent 34%), linear-gradient(180deg, rgb(var(--color-surface) / 0.95), rgb(var(--color-background) / 1))",
      },
    },
  },
  plugins: [],
};

export default config;
