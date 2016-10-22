'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
    jade = require('gulp-jade'),
    spritesmith = require('gulp.spritesmith');

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        sprite: 'build/sprite/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        jade: 'src/*.jade',
        js: 'src/js/app.js',
        style: 'src/style/app.less',
        img: 'src/images/**/*.*',
        sprite: 'src/sprite/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        jade: 'src/**/*.jade',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.less',
        img: 'src/images/**/*.*',
        sprite: 'src/sprite',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};



var server = {
//    logConnections  : false,
//    reloadOnRestart : false,
//    notify          : false,
    open: false,
    tunnel: false,
    server: {
        baseDir: "build"
    }
};

gulp.task('copy', function () {
    // gulp.src('vendor/material-design-lite/material.css')
    //     .pipe(gulp.dest('build/css/vendor'));
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('webserver', function() {
    browserSync.init(server);
});


gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('jade:build', function() {
  gulp.src(path.src.jade)
    .pipe(jade())
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        //.pipe(sourcemaps.init())
        //.pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js));
    browserSync.reload();
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefixer())
        // .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));
    browserSync.reload();
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
    browserSync.reload();
});

// генерация спрайтов
gulp.task('sprite:build', function () {
  var spriteData = gulp.src(path.src.sprite).pipe(spritesmith({
    padding: 20,
    imgPath: '/sprite/sprite.png',
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest( path.build.sprite ));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    // 'jade:build',
    'js:build',
    'style:build',
    'copy',
    'fonts:build',
    'image:build',
    'sprite:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.jade], function(event, cb) {
        gulp.start('jade:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
        gulp.start('copy');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);
