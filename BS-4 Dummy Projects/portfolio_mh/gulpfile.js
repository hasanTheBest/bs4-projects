var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var sourcemaps = require( 'gulp-sourcemaps' );
var autoprefixer = require( 'gulp-autoprefixer' );
var rename = require( 'gulp-rename' );
var uglify = require( 'gulp-uglify' );
var htmlmin = require( 'gulp-htmlmin' );
var imagemin = require( 'gulp-imagemin' );
var concat = require( 'gulp-concat' );
var browserSync = require( 'browser-sync' ).create();

// var bsStyleSRC = 'node_modules/bootstrap/scss/bootstrap.scss';
// var faStyleSRC = 'node_modules/font-awesome/scss/font-awesome.scss';
var htmlSRC = 'src/*.html';
var styleSRC = 'src/scss/*.scss';
var htmlWatch = 'src/**/*.html';
var styleWatch = 'src/scss/**/*.scss';
var htmlDIST = './dist/';
var styleDIST = './dist/css/';

// var jquerySRC = 'node_modules/jquery/dist/jquery.js';
// var BSjsSRC = 'node_modules/bootstrap/dist/js/bootstrap.js';
var jsSRC = 'src/js/*.js';
var jsWatch = 'src/js/**/*.js';
var jsDIST = './dist/js/';

var fontsSRC = 'src/fonts/*';
var fontsDIST = './dist/fonts/';

gulp.task( 'bs', function(){
	browserSync.init({
		open: false,
		injectChange: true,
		server: {
			baseDir: './dist/'
		}
	});
} );

gulp.task( 'html', function(){
	gulp.src( htmlSRC )
		.pipe( htmlmin({ 
			collapseWhitespace: true,
			minifyCss: true,
			minifyJavascript: true,
			processConditionalComments: true,
			removeComments: true,
			html5: true,
			decodeEntityCharacters: true
		}) )
		.pipe( gulp.dest( htmlDIST ) )
		.pipe( browserSync.stream() );
} );

gulp.task('style', function(){
	gulp.src( styleSRC )
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
		.pipe( gulp.dest( styleDIST ) )
		.pipe( browserSync.stream() );;
});


gulp.task('js', function(){
	gulp.src( jsSRC )
		.pipe( uglify() )
		.pipe( rename({ extname: '.min.js' }) )
		.pipe( gulp.dest( jsDIST ) )
		.pipe( browserSync.stream() );;
});


// Move Fonts to src/fonts
/*gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
})*/

// compressed image
gulp.task('minify-img', () =>
	gulp.src('src/img/*')
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 7}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest('./dist/img/'))
);

gulp.task( 'default', [ 'html','style', 'js' ] );

gulp.task( 'watch', ['default', 'bs'], function(){
	gulp.watch( styleWatch, ['style'] );
	gulp.watch( jsWatch, ['js', browserSync.reload] );
	gulp.watch( htmlWatch, ['html', browserSync.reload] );
} );