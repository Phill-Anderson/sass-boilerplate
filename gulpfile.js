const { src, dest, watch, series, parallel } = require("gulp");
const minify = require("gulp-minify");
var concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");

async function buildStyles() {
  return (
    src("src/sass_custom/**/*.scss")
      .pipe(sass({ outputStyle: "expanded" }))
      // .pipe(purgecss({ content: ['*.html'] }))
      .pipe(dest("build/css"))
  );
}

// async function buildJS() {
//   return src("src/js/**/*.js")
//     .pipe(concat("bundle.js"))
//     .pipe(minify())
//     .pipe(dest("build/js"));
// }

function watchTask() {
  watch(
    ["src/sass_library/**/*.scss", "src/sass_custom/**/*.scss", "*.html"],
    buildStyles
  );
}

exports.default = series(buildStyles, watchTask);
