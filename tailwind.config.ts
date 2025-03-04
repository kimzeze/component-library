import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      size: {
        base: "10px",
        xs: "1.2rem",
        sm: "1.4rem",
        md: "1.6rem",
        lg: "1.8rem",
        xl: "2.0rem",
        xxl: "2.4rem",
        xxxl: "2.8rem",
        xxxxl: "3.2rem",
        xxxxxl: "4.0rem",
      },

      spacing: {
        xxxxxs: "0.2rem",
        xxxxs: "0.4rem",
        xxxs: "0.8rem",
        xxs: "1.0rem",
        xs: "1.2rem",
        sm: "1.4rem",
        md: "1.6rem",
        lg: "1.8rem",
        xl: "2.0rem",
        xxl: "2.4rem",
        xxxl: "2.8rem",
        xxxxl: "3.2rem",
        xxxxxl: "4.0rem",
      },

      borderRadius: {
        none: "0",
        xs: "0.4rem",
        sm: "0.6rem",
        md: "0.8rem",
        lg: "1.0rem",
        xxl: "2.0rem",
        full: "50%",
      },

      colors: {
        error: {
          DEFAULT: "#ff5e47",
        },
        primary: {
          "50": "#f0f9ff",
          "100": "#e0f2fe",
          "200": "#bae6fd",
          "300": "#7dd3fc",
          "400": "#38bdf8",
          "500": "#0ea5e9",
          "600": "#0284c7",
          "700": "#0369a1",
          "800": "#075985",
          "900": "#0c4a6e",
          "950": "#082f49",
        },
        secondary: {
          "50": "#f8fafc",
          "100": "#f1f5f9",
          "200": "#e2e8f0",
          "300": "#cbd5e1",
          "400": "#94a3b8",
          "500": "#64748b",
          "600": "#475569",
          "700": "#334155",
          "800": "#1e293b",
          "900": "#0f172a",
          "950": "#020617",
        },
        gray: {
          25: "#f8f8f8",
          50: "#f3f3f3",
          100: "#e6e6e6",
          200: "#cccccc",
          300: "#b3b3b3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4d4d4d",
          800: "#333333",
          900: "#1a1a1a",
          950: "#030303",
        },
      },

      fontSize: {
        base: "10px",
        xs: "1.2rem",
        sm: "1.4rem",
        md: "1.6rem",
        lg: "1.8rem",
        xl: "2.0rem",
        xxl: "2.4rem",
        xxxl: "2.8rem",
        xxxxl: "3.2rem",
        xxxxxl: "4.0rem",
      },

      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      lineHeight: {
        none: "1",
        normal: "1.5",
      },

      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
        none: "none",
      },
    },
  },
  plugins: [],
};

export default config;
