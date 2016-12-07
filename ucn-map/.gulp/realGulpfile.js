var gulp = require("gulp"),
    del = require("del"),
    rename = require("gulp-rename");

var folders = {
    nodeModules: "node_modules/",
    publicNodeCopy: "public/node_copy/",
    importsNodeCopy: "imports/node_copy/"
};

//Workaround for https://github.com/fourseven/meteor-scss/issues/195
gulp.task("preparingForSass", function () {
    var fontawesome = "font-awesome";
    var modules = [
        "bootstrap-sass",
        fontawesome
    ];
    for (var i = 0; i < modules.length; i++) {
        var module = modules[i];
        moveFolder(module,
            folders.nodeModules + module + "/**/*",
            folders.importsNodeCopy + module
        );
        console.log("copied nodeModule: " + module);
    }
    moveFolder(fontawesome,
        folders.nodeModules + fontawesome + "/fonts/*",
        folders.publicNodeCopy + fontawesome + "/fonts"
    );
    console.log("copied " + fontawesome + " fonts to public folder");
    var calendar = "angular-bootstrap-calendar";
    gulp.src(folders.nodeModules + calendar + "/dist/css/" + calendar + ".css")
        .pipe(rename(calendar + ".scss"))
        .pipe(gulp.dest(folders.importsNodeCopy + calendar));
    console.log("copied and renamed " + calendar + " to import folder");
});

gulp.task("clean:preparingForSass", function () {
    return del([
        folders.publicNodeCopy,
        folders.importsNodeCopy
    ]);
});

function moveFolder(name, source, dest) {
    return gulp.src(source)
        .pipe(gulp.dest(dest));
}