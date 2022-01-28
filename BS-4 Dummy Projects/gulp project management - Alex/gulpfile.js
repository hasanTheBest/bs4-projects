var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );
var sass = require( 'gulp-sass' );
var uglify = require( 'gulp-uglify' );
var autoprefixer = require( 'gulp-autoprefixer' );
var sourcemaps = require( 'gulp-sourcemaps' );

var bsStyleSRC = 'node_modules/bootstrap/scss/bootstrap.scss';
var faStyleSRC = 'node_modules/font-awesome/scss/font-awesome.scss';
var styleSRC = 'src/scss/style.scss';
var styleWatch = 'src/scss/**/*.scss';
var styleDIST = './dist/css/';

var jquerySRC = 'node_modules/jquery/dist/jquery.js';
var BSjsSRC = 'node_modules/bootstrap/dist/js/bootstrap.js';
var jsSRC = 'src/js/script.js';
var jsWatch = 'src/js/**/*.js';
var jsDIST = './dist/js/';

gulp.task('style', function(){
	// Compile Here
	gulp.src( [bsStyleSRC, faStyleSRC, styleSRC] )
		.pipe( sourcemaps.init() )
		.pipe( sass({ 
			errorLogToConsole: true,
			outputStyle: 'compressed'
		 }) )
		.on( 'error', console.error.bind( console ) )
		.pipe( autoprefixer({
			browsers: ['last 2 version'], 
			cascade: false
		}) )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( styleDIST ) );
});


gulp.task('js', function(){
	gulp.src( [jquerySRC, BSjsSRC, jsSRC] )
		.pipe( uglify() )
		.pipe( rename({ extname: '.min.js' }) )
		.pipe( gulp.dest( jsDIST ) );
});


// Move Fonts to src/fonts
gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts'))
})


gulp.task( 'default', [ 'style', 'fonts', 'js' ] );


gulp.task( 'watch', ['default'], function(){
	gulp.watch( styleWatch, ['style'] );
	gulp.watch( jsWatch, ['js'] );
} );