const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/scss/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/scss/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task('html', function () {
    return gulp.src("src/pug/*.pug")
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest("dist/"));
});



gulp.task('icons', function () {
    return gulp.src("src/media/icons/*")
        .pipe(gulp.dest("dist/media/icons"))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src("src/media/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/media/img"))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'icons', 'html', 'images'));









// const styles = () => {
//     return gulp.src('src/scss/*.scss')
//         .pipe(sass().on('err', sass.logError))
//         .pipe(autoprefixer())
//         .pipe(rename( { suffix: '.min' } ))
//         .pipe(gulp.dest('dist/css'))
// }



// const images = () => {
//     return gulp.src("src/media/img/*")
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/media/img/'))
// }
// const icons = () => {
//     return gulp.src("src/media/icons/*")
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/media/icons/'))
// }

// const server = () => {
//     browserSync.init({
//         server: {
//             baseDir: './dist'
//         },
//         notify: false
//     });
//     browserSync.watch('dist', browserSync.reload)
// }

// const deleteBuild = (cb) => {
//     return del('dist/**/*.*').then(() => { cb() })
// }

// const watch = () => {
//     gulp.watch('src/pug//*.pug', html);
//     gulp.watch('src/scss/*.scss', styles);
//     gulp.watch('src/media/img/*.*', images);
//     gulp.watch('src/media/icons/*.*', icons);
// }

// exports.default = series(
//     deleteBuild,
//     parallel(html, styles, icons, images),
//     parallel(watch, server)
// )