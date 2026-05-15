import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Futuristic Florida ocean palette
        abyss: "#040A14",
        midnight: "#0A1628",
        deep: "#0F2240",
        reef: "#0C3B5E",
        // Neon chartplotter accents
        plotter: "#00E5FF",
        plotterDark: "#00B8D4",
        sonar: "#00FFB2",
        // Florida warmth
        coral: "#FF6B47",
        sun: "#FFD60A",
        sand: "#F5E6D3",
        foam: "#F8FAFC",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grid-plotter":
          "linear-gradient(rgba(0,229,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,.06) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(0,229,255,.18), transparent 60%)",
        "hero-overlay":
          "linear-gradient(180deg, rgba(4,10,20,.4) 0%, rgba(4,10,20,.85) 60%, #040A14 100%)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      boxShadow: {
        glow: "0 0 32px -4px rgba(0,229,255,.45)",
        glowCoral: "0 0 32px -4px rgba(255,107,71,.5)",
        card: "0 4px 24px -8px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.04)",
      },
      animation: {
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "scan": "scan 6s linear infinite",
        "fade-up": "fadeUp .8s ease-out forwards",
      },
      keyframes: {
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 24px -4px rgba(0,229,255,.35)" },
          "50%": { boxShadow: "0 0 48px -4px rgba(0,229,255,.65)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
