var gulp = require('gulp')
var ejs  = require('gulp-ejs')
var browserSync = require('browser-sync').create()

/**
 * BootstrapのCSSとJSをコピー
 */
gulp.task('bootstrap-copy', function() {
    gulp.src('node_modules/bootstrap/dist/css/' + 'bootstrap.*').pipe(gulp.dest('site/css/'))
    gulp.src('node_modules/bootstrap/dist/js/'  + 'bootstrap.*').pipe(gulp.dest('site/js/'))
})

/**
 * EJS --> HTML 変換
 */
gulp.task('ejs', function() {
    gulp.src([
        'src/templates/**/*.ejs', '!' + 'src/templates/**/_*.ejs'
    ])
    .pipe(ejs({}, {}, {ext:'.html'}))
    .pipe(gulp.dest('site/'))
})

/**
 * 自前のCSSをコピー
 */
gulp.task('css-copy', function() {
    gulp.src('src/css/**/*.css').pipe(gulp.dest('site/css/'))
})

/**
 * 自前のJSをコピー
 */
gulp.task('js-copy', function() {
    gulp.src('src/js/**/*.js').pipe(gulp.dest('site/js/'))
})

/**
 * 画像をコピー
 */
gulp.task('images-copy', function() {
    gulp.src('src/images/**/*').pipe(gulp.dest('site/images/'))
})


/**
 * 必要な静的ファイルをコピー
 */
gulp.task('copy', ['bootstrap-copy', 'css-copy', 'js-copy', 'images-copy'])

/**
 * 全体のビルド
 */
gulp.task('build', ['copy', 'ejs'])

/**
 * Webサーバー起動 + ブラウザ起動
 */
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "site",
            index  : "index.html"
        }
    })
})

/**
 * ブラウザリロード
 */
gulp.task('reload', function() {
    browserSync.reload()
})

/**
 * 開発スタート
 */
gulp.task('default', ['build', 'browser-sync'], function() {
    gulp.watch('src/templates/**/*.ejs', ['ejs', 'reload'])
    gulp.watch('src/css/**/*.css', ['css-copy', 'reload'])
})
