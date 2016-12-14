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
    var cssModules = [
        {
            name: "angular-bootstrap-calendar",
            path: "angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.css"
        },
        {
            name: "angular-ui-notification",
            path: "angular-ui-notification/dist/angular-ui-notification.css"
        }
    ];
    for (var i = 0; i < modules.length; i++) {
        var module = modules[i];
        moveFolder(module,
            folders.nodeModules + module + "/**/*",
            folders.importsNodeCopy + module
        );
    }
    moveFolder(fontawesome,
        folders.nodeModules + fontawesome + "/fonts/*",
        folders.publicNodeCopy + fontawesome + "/fonts"
    );

    for (var i = 0; i < cssModules.length; i++) {
        var cssModule = cssModules[i];
        moveAndRenameCssModule(cssModule);
    }

});

gulp.task("clean:preparingForSass", function () {
    return del([
        folders.publicNodeCopy,
        folders.importsNodeCopy
    ]);
});

function moveFolder(name, source, dest) {
    var val = gulp.src(source)
        .pipe(gulp.dest(dest));
    console.log("copied nodeModule: " + name + ", to: " + dest);
    return val;
}

function moveAndRenameCssModule(cssModule) {
    var dest = folders.importsNodeCopy + cssModule.name;
    var val = gulp.src(folders.nodeModules + cssModule.path)
        .pipe(rename(cssModule.name + ".scss"))
        .pipe(gulp.dest(dest));
    console.log("copied css (and renamed to scss) for: " + cssModule.name + ", to: " + dest + ".scss");
    return val;
}