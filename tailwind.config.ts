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
        "surface-soft": "rgb(var(--color-surface-soft) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        outline: "rgb(var(--color-outline) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-soft": "rgb(var(--color-accent-soft) / <alpha-value>)",
        rose: "rgb(var(--color-rose) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        sky: "rgb(var(--color-sky) / <alpha-value>)",
        coral: "rgb(var(--color-coral) / <alpha-value>)",
        lavender: "rgb(var(--color-lavender) / <alpha-value>)",
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
          "radial-gradient(circle at 10% 10%, rgb(var(--color-accent-soft) / 0.75), transparent 18%), radial-gradient(circle at 88% 12%, rgb(var(--color-sky) / 0.38), transparent 18%), radial-gradient(circle at 82% 75%, rgb(var(--color-rose) / 0.28), transparent 18%), linear-gradient(180deg, rgb(255 255 255 / 0.8), rgb(var(--color-background) / 1))",
      },
    },
  },
  plugins: [],
};

export default config;
