const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const { src, dest, task, parallel, watch } = require("gulp");

const htmlSrc = "./app/*.html";
const htmlDest = "./dist/";
const copyHtml = () => src(htmlSrc).pipe(dest(htmlDest));
task("copyHtml", copyHtml);

const imagesSrc = "./app/assets/images/*";
const imagesDest = "./dist/assets/images/";
const imageMin = () => src(imagesSrc).pipe(imagemin()).pipe(dest(imagesDest));
task("imageMin", imageMin);

const scriptSrc = "./app/assets/js/*.js";
const scriptDest = "./dist/assets/js/";
const scriptName = "main.js";
const scripts = () => src(scriptSrc).pipe(uglify(scriptName)).pipe(dest(scriptDest));
task("scripts", scripts);

const styleSrc = "./app/assets/styles/**/*.scss";
const styleDest = "./dist/assets/styles/";
const style = () => src(styleSrc).pipe(sass().on("error", sass.logError)).pipe(dest(styleDest));
task("style", style);

const watchFiles = () => {
    watch(scriptSrc, scripts);
    watch(styleSrc, style);
    watch(htmlSrc, copyHtml);
    watch(imagesSrc, imageMin);
}

task('default', parallel(['copyHtml', 'imageMin', 'style', 'scripts']));
task("watch", watchFiles);



