import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        label: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.05em" }],
      },
      colors: {
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
        surface: {
          0:   "#ffffff",
          50:  "#f8f8f7",
          100: "#f1f0ee",
          200: "#e8e6e2",
          300: "#d6d3cc",
        },
        ink: {
          900: "#1a1917",
          700: "#3d3b36",
          500: "#6b6860",
          300: "#a09d96",
          100: "#d4d2cc",
        },
      },
      boxShadow: {
        card:       "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        "card-hover": "0 4px 16px 0 rgb(0 0 0 / 0.08), 0 2px 4px -1px rgb(0 0 0 / 0.04)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
