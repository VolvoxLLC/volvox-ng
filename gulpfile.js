const gulp = require('gulp');

// Copy schemas
gulp.task('copy:schematic-schemas', function () {
    return gulp.src(['material/schematics/*/schema.json'])
        .pipe(gulp.dest('dist/@volvox-ng/material/schematics'));
});

// Copy schematics files
gulp.task('copy:schematic-files', function () {
    return gulp.src(['material/schematics/*/files/**'])
        .pipe(gulp.dest('dist/@volvox-ng/material/schematics'));
});

// copy collection file
gulp.task('copy:schematic-collection', function () {
    return gulp.src(['material/schematics/collection.json'])
        .pipe(gulp.dest('dist/@volvox-ng/material/schematics'));
});