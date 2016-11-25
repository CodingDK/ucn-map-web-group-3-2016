var gulp = require("gulp"),
    del = require("del");

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
        console.log("copy nodeModule: " + module);
    }
    moveFolder(fontawesome,
        folders.nodeModules + fontawesome + "/fonts/*",
        folders.publicNodeCopy + fontawesome + "/fonts"
    );
    console.log("copy " + fontawesome + " fonts to public folder");
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