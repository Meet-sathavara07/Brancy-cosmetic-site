module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    "postcss-preset-env": {
      stage: 3, // Changed from 0 to 3 for better stability
      features: {
        "logical-properties-and-values": false,
        "prefers-color-scheme-query": false,
        "gap-properties": false,
        "custom-properties": false,
        "nesting-rules": false, // Already handled by tailwindcss/nesting
      },
    },
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
}