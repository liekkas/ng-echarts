/**
 * Created by liekkas.zeng on 2015/1/7.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('build',function(){
    del(['dist']);

    gulp.src('src/**/*.js')
        .pipe(concat('ng-echarts.js'))
        .pipe(gulp.dest('dist'))

    gulp.src('src/**/*.js')
        .pipe(concat('ng-echarts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['build'], function () {
    gulp.watch('src/**/*.js', ['build'])
});

gulp.task('default',['watch']);