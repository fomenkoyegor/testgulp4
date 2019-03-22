const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const { src, dest, task, parallel, watch } = require("gulp");
const dir = { src: "./app/", dest: "./dist/" }

const htmlSrc = `${dir.src}*.html`;
const htmlDest = dir.dest;
const copyHtml = () => src(htmlSrc).pipe(dest(htmlDest));
task("copyHtml", copyHtml);

const imagesSrc = `${dir.src}assets/images/*`;
const imagesDest = `${dir.dest}assets/images/`;
const imageMin = () => src(imagesSrc).pipe(imagemin()).pipe(dest(imagesDest));
task("imageMin", imageMin);

const scriptSrc = `${dir.src}assets/js/*.js`;
const scriptDest = `${dir.dest}assets/js/`;
const scriptName = "main.js";
const scripts = () => src(scriptSrc).pipe(concat(scriptName)).pipe(uglify()).pipe(dest(scriptDest));
task("scripts", scripts);

const styleSrc = `${dir.src}assets/styles/**/*.scss`;
const styleDest = `${dir.dest}assets/styles/`;
const styleName = "main.css";
const style = () => src(styleSrc)
    .pipe(sass().on("error", sass.logError))
    .pipe(concat(styleName))
    .pipe(autoprefixer({
        browsers: ['last 5 versions', '> 1%', 'ie 8', 'ie 7'],
        cascade: false
    }))
    .pipe(cleanCSS({level: 2}))
    .pipe(dest(styleDest));
task("style", style);

const watchFiles = () => {
    watch(scriptSrc, scripts);
    watch(styleSrc, style);
    watch(htmlSrc, copyHtml);
    watch(imagesSrc, imageMin);
}

task('default', parallel(['copyHtml', 'imageMin', 'style', 'scripts']));
task("watch", watchFiles);



