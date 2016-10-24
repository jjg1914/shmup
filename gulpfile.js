var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var mustache = require("gulp-mustache");
var htmlmin = require("gulp-htmlmin");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var cssmin = require("gulp-cssmin");
var rename = require("gulp-rename");
var gulpIf = require("gulp-if");
var tslint = require("gulp-tslint");
var plumber = require("gulp-plumber");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var lazypipe = require("lazypipe");
var browserify = require("browserify");
var watchify = require("watchify");
var tsify = require("tsify");
var del = require("del");

gulp.task("default", [ "server" ]);

gulp.task("server", [ "build" ], function(done) {
  process.on("SIGINT", function() {
    done();
    process.exit(0);
  });

  var express = require("express");
  var morgan = require("morgan");
  var serveStatic = require("serve-static");

  var app = express();
  app.use(morgan("dev"))
  app.use(serveStatic("public"));
  app.listen(process.env.PORT || 8080);
});

gulp.task("build", [ "js", "css", "html" ], function() {
  if (process.env.NODE_ENV !== "production") {
    b.on("update", bundle);
    b.on("log", function(msg) { console.log(msg); });
    gulp.watch("src/**/*.scss", [ "css" ]);
    gulp.watch("src/**/*.html", [ "html" ]);
  }
});

var b = browserify({
  entries: [ "./src/index.ts" ],
  debug: (process.env.NODE_ENV != "production"),
  cache: {},
  packageCache: {},
  plugin: [ tsify ],
});

if (process.env.NODE_ENV !== "production") {
  b = watchify(b);
}

function bundle() {
  return b.bundle()
    .pipe(plumber())
    .pipe(source("index.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpIf((process.env.NODE_ENV == "production"), lazypipe()
      .pipe(uglify)
      .pipe(rename, { suffix: ".min" })()))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("public"));
}

gulp.task("js", bundle);

gulp.task("css", function() {
  return gulp.src("src/index.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulpIf((process.env.NODE_ENV === "production"), lazypipe()
      .pipe(cssmin)
      .pipe(rename, { suffix: ".min" })()))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("public"));
});

gulp.task("html", function() {
  var production = process.env.NODE_ENV === "production";

  return gulp.src("src/index.html")
    .pipe(plumber())
    .pipe(mustache({
      cssFile: (production ? "index.min.css" : "index.css"),
      jsFile: (production ? "index.min.js" : "index.js"),
    }))
    .pipe(gulpIf((process.env.NODE_ENV === "production"), lazypipe()
      .pipe(htmlmin)()))
    .pipe(gulp.dest("public"));
});

gulp.task("lint", function() {
  return gulp.src("src/**/*.ts")
    .pipe(tslint())
    .pipe(tslint.report("verbose"));
});

gulp.task("clean", function() {
  return del([ "public/**/*" ]);
});
