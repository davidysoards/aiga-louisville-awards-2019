const purgecss = require("@fullhuman/postcss-purgecss")({
  // path to template files
  content: ["./src/site/**/*.njk"],
  // Include any special characters used in your classes
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production"
      ? [purgecss, require("cssnano")]
      : [])
  ]
};
