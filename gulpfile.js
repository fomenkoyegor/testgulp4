const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require("gulp-babel");
const del = require("del");
const browserSync = require('browser-sync').create();
const { src, dest, task, parallel, watch, series } = require("gulp");
const dir = { src: "./app/", dest: "./dist/" }

const htmlSrc = `${dir.src}*.html`;
const htmlDest = dir.dest;
const copyHtml = () => src(htmlSrc).pipe(dest(htmlDest));
task("copyHtml", copyHtml);

const staticSrc = `${dir.src}static/**/*`;
const staticDest = `${dir.dest}static/`;
const copyStatic = () => src(staticSrc).pipe(dest(staticDest));
task("copyStatic", copyStatic);

const imagesSrc = `${dir.src}assets/images/*`;
const imagesDest = `${dir.dest}assets/images/`;
const imageMin = () => src(imagesSrc).pipe(imagemin()).pipe(dest(imagesDest));
task("imageMin", imageMin);

const scriptSrc = `${dir.src}assets/js/*.js`;
const scriptDest = `${dir.dest}assets/js/`;
const scriptName = "main.js";
const scripts = () => src(scriptSrc)
    .pipe(babel())
    .pipe(concat(scriptName))
    .pipe(uglify())
    .pipe(dest(scriptDest))
    .pipe(browserSync.stream());
task("scripts", scripts);

const styleSrc = `${dir.src}assets/styles/**/*.scss`;
const styleDest = `${dir.dest}assets/styles/`;
const styleName = "main.css";
const style = () => src(styleSrc)
    .pipe(sass().on("error", sass.logError))
    .pipe(concat(styleName))
    .pipe(autoprefixer({
        browsers: ['last 5 versions', '> 0.1%', 'ie 8', 'ie 7'],
        cascade: false
    }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(dest(styleDest))
    .pipe(browserSync.stream());
task("style", style);

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: dir.dest
        },
    });
    watch(scriptSrc, scripts);
    watch(styleSrc, style);
    watch(htmlSrc, copyHtml).on('change', browserSync.reload);
    watch(imagesSrc, imageMin);
    watch(staticSrc, copyStatic).on('change', browserSync.reload);
}

const clean = () => del([`${dir.dest}*`]);
task("clean", clean);

task('default', parallel(
    [
        'copyStatic',
        'copyHtml',
        'imageMin',
        'style',
        'scripts'
    ]
));

task("watch", watchFiles);

task("build", series("clean", "default"));

task("dev", series("build", "watch"));


