// postcss.config.cjs  ★この 4 行で完結
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),   // ← これだけで OK
    require('autoprefixer'),           // 任意
  ],
};
