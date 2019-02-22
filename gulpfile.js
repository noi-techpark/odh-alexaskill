var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var OUT_DIR = "dist/custom";
var IN_DIR = "lambda/custom";

// compile typescript
gulp.task("compile", () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(OUT_DIR));
});

// copy package.json and package-lock.json
gulp.task("json", () => {
    gulp.src([IN_DIR + "/package.json", IN_DIR + "/package-log.json"]).pipe(gulp.dest(OUT_DIR));
});

// copy node_modules
gulp.task("node_modules", () => {
    gulp.src(IN_DIR + "/node_modules/**/*").pipe(gulp.dest(OUT_DIR + "/node_modules"));
})

gulp.task("default", ["compile", "json", "node_modules"]);