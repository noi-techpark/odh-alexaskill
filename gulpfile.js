var gulp = require("gulp");
var fs = require("fs");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var packageJson = require('./package.json');

var gulp = require('gulp');
var OUT_DIR = "./dist/custom";
var IN_DIR = "./lambda/custom";
var packageJson = require(IN_DIR+'/package.json');

// compile typescript
gulp.task("compile", () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(OUT_DIR));
});

// copy package.json and package-lock.json
gulp.task("json", () => {
    gulp.src([IN_DIR + "/package.json", IN_DIR + "/package-log.json"]).pipe(gulp.dest(OUT_DIR));
    // delete packageJson.devDependencies;
    // if (!fs.existsSync(OUT_DIR)){
    //     fs.mkdirSync(OUT_DIR);
    // }
    // fs.writeFileSync(OUT_DIR+"/package.json", JSON.stringify(packageJson), { flag: 'wx' });
    // fs.writeFileSync(OUT_DIR+"/package.json", 'Hello content!', function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    //   });
});

// copy only node_modules in the dependency section
gulp.task("node_modules", () => {
    var modules = Object.keys(packageJson.dependencies);
    var moduleFiles = modules.map(function (module) {
        return 'node_modules/' + module + '/**/*.*';
    });
    return gulp.src(moduleFiles, { base: 'node_modules' })
        .pipe(gulp.dest(OUT_DIR + "/node_modules"));
})

gulp.task("default", ["compile", "json", "node_modules"]);