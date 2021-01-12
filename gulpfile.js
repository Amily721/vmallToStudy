var { series, parallel, watch, src, dest } = require('gulp');
var fileInclude = require('gulp-file-include');
var clean = require('gulp-clean');
var htmlMin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var cssMin = require('gulp-cssmin');
// var babel = require('gulp-babel');
var webserver = require('gulp-webserver');

// 处理html
function fileIncludeTask() {// 整理html的代码片段的任务
    return src('./src/view/*.html')
        .pipe(fileInclude({
            prefix: '@',
            basepath: './src/view/templates'
        }))
        .pipe(dest('./dist/view'));
}

function htmlMinTask() {// 压缩html的代码片段的任务??
    return src('./src/view/*.html')
        .pipe(fileInclude({
            prefix: '@',
            basepath: './src/view/templates'
        }))
        .pipe(htmlMin())
        .pipe(dest('./dist/view'));
}

// 处理css
function sassTask() {// 处理SCSS的任务
    return src('./src/css/*.scss')
        .pipe(sass())
        .pipe(dest('./dist/css'));
}

function cssMinTask() {// 压缩css代码的任务
    return src('./src/css/*.scss')
        .pipe(sass())
        .pipe(cssMin())
        .pipe(dest('./dist/css'));
}

function apiTask() {// 更新api任务
    return src('./src/api/**')
        .pipe(dest('./dist/api'));
}

function jsTask() {// 更新js的任务
    return src('./src/js/**')
        .pipe(dest('./dist/js'));
}

function libTask() { //更新lib的任务
    return src('./src/lib/**')
        .pipe(dest('./dist/lib'));
}

function staticTask() { //更新static的任务
    return src('./src/static/**')
        .pipe(dest('./dist/static'));
}

function webserverTask() { // 开启web服务器(在浏览器中预览编写的代码)
    return src('./dist')
        .pipe(webserver({
            host: 'localhost',
            port: 4000,
            open: './view/index.html',  // dist下的index.html
            livereload: true,
            // proxies: [   //配置反向代理
            //     {
            //         source: '/api2',
            //         target: 'http://localhost/api2'
            //     }
            // ]
        }));
}

function watchTask() { // 监听文件变化的任务
    watch('./src/api/**', apiTask);
    watch('./src/css/**', sassTask);
    watch('./src/js/**', jsTask);
    watch('./src/lib/**', libTask);
    watch('./src/static/**', staticTask);
    watch('./src/view/**', fileIncludeTask);
}


// 清除dist文件夹的任务
function cleanTask() {
    return src('./dist', { allowEmpty: true })
        .pipe(clean());
}


module.exports = {
    // 开发调用的接口
    dev: series(cleanTask, parallel(fileIncludeTask, sassTask, apiTask, jsTask, libTask, staticTask), parallel(webserverTask, watchTask)),

    // 生产调用的接口
    build: series(cleanTask)
}