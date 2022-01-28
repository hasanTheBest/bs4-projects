var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );
var sass = require( 'gulp-sass' );
var uglify = require( 'gulp-uglify' );
var autoprefixer = require( 'gulp-autoprefixer' );
var sourcemaps = require( 'gulp-sourcemaps' );
var htmlmin = require( 'gulp-htmlmin' );
var browserSync = require( 'browser-sync' ).create();
var imagemin = require( 'gulp-imagemin' );
var concat = require( 'gulp-concat' );


var bsStyleSRC = 'node_modules/bootstrap/scss/bootstrap.scss';
var faStyleSRC = 'node_modules/font-awesome/scss/font-awesome.scss';
var styleSRC = 'src/scss/*.scss';
var styleWatch = 'src/scss/**/*.scss';
var styleDIST = './dist/css/';

var jquerySRC = 'node_modules/jquery/dist/jquery.js';
var BSjsSRC = 'node_modules/bootstrap/dist/js/bootstrap.bundle.js';
var jsSRC = 'src/js/*.js';
var jsWatch = 'src/js/**/*.js';
var jsDIST = './dist/js/';
var htmlWatch = './src/*.html'

// browsder syncronazation
gulp.task('bs', function(){
	browserSync.init({
		open: false,
		injectChange: true,
		server: {
            baseDir: "./dist"
        }
	});
});

// compress html
gulp.task('minify-html', function(){
	return gulp.src('src/*.html')
    .pipe(htmlmin({
    	collapseWhitespace: true,
    	processConditionalComments: true,
    	removeComments: true
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

// style compression and mapping
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
		.pipe( gulp.dest( styleDIST ) )
    	.pipe(browserSync.stream());
});

// autoamation of js folder/file
gulp.task('js', function(){
	gulp.src( [jquerySRC, BSjsSRC, jsSRC] )
		.pipe( uglify() )
		.pipe( rename({ extname: '.min.js' }) )
		.pipe( gulp.dest( jsDIST ) )
    	.pipe(browserSync.stream());
});


// Move Fonts to src/fonts
gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts'))
})

// defualt task
gulp.task( 'default', [ 'style', 'fonts', 'js', 'minify-html' ] );

// watching automation
gulp.task( 'watch', ['default', 'bs'], function(){
	gulp.watch( styleWatch, ['style'] );
	gulp.watch( jsWatch, ['js', browserSync.reload] );
	gulp.watch( htmlWatch, ['minify-html', browserSync.reload] );
} );

// image compression
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

// js concat
gulp.task('js-concat', function() {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js/'));
});