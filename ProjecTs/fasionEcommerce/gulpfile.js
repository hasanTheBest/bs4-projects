const gulp = require('gulp');
const sass = require('gulp-sass');
const srcmaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const csslint = require('gulp-csslint');


const styleBsSRC = 'node_modules/bootstrap/scss/bootstrap.scss';
const styleSiteSRC = 'src/scss/site.scss';

const watchStyleBsSRC = 'node_modules/bootstrap/scss/bootstrap.scss';
const watchStyleSiteSRC = 'src/scss/**/*.scss';

const styleDest = './dist/css/';

const jsBsSRC = 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
const jsJquerySRC = 'node_modules/jquery/dist/jquery.min.js';
const jsSiteSRC = 'src/js/site.js';

const watchJsSiteSRC = 'src/js/**/*.js';

const jsDest = './dist/js/';

gulp.task( 'style', function(){
	gulp.src( [styleBsSRC, styleSiteSRC] )
		.pipe( srcmaps.init() )
		.pipe( sass({
			errorLogToConsole: true,
			outputStyle: 'compressed'
		}) )
		.pipe( autoprefixer({
			browsers: 'last 2 version', 
			cascade: false
		}) )
		.pipe(rename({ suffix: '.min' }))
		.pipe( srcmaps.write('./') )
		.pipe(gulp.dest( styleDest ));
} );

gulp.task( 'js', function(){
	return gulp.src([jsBsSRC, jsJquerySRC, jsSiteSRC])
        .pipe(gulp.dest(jsDest));
} );


gulp.task( 'default', ['style', 'js'] );

gulp.task( 'watch', function(){
	gulp.watch( [watchStyleSiteSRC, watchStyleSiteSRC, ], ['style'] );
	gulp.watch( watchJsSiteSRC, ['js'] );
} )

// VALIDATING CSS RULES
gulp.task('lint-css', function(){
	gulp.src('dist/css/site.min.css')
    .pipe(csslint())
    .pipe(csslint.formatter());
});