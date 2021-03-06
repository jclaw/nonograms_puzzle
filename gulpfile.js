var gulp = require('gulp'),
    connect = require('gulp-connect');

var paths = {
  html: '*.html',
  css: 'assets/css/*',
  js: 'assets/js/**/*',
  json: 'assets/json/**/*'
};

gulp.task('express', function(){
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 35729}));
  app.use(express.static(__dirname));
  app.listen(process.env.PORT || 9000);
});

gulp.task('html', function () {
  gulp.src(paths.html)
    .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src(paths.css)
    .pipe(connect.reload());
})

gulp.task('js', function() {
  gulp.src(paths.js)
    .pipe(connect.reload());
    // .pipe(jshint('./.jshintrc'))
    // .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('json', function() {
  gulp.src(paths.json)
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.json, ['json']);
});

gulp.task('serve', ['express'], function() {
  connect.server({
    livereload: false
    // root: ''
  });
});

// gulp.task('webserver', function() {
//     gulp.src('')
//         .pipe(webserver({
//             livereload: true,
//             open: true
//         }));
// });

// gulp.task('production','', function(){
//   var express = require('express');
//   var app = express();
//   app.use(express.static('welcome'));
//   app.listen(process.env.PORT || 8080);
// });

gulp.task('default', ['watch', 'serve']);
