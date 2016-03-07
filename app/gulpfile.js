/*****
Dependencies
******/
var gulp 				= require('gulp'),									//gulp core

	browserify    = require('browserify'), 						//Is used for building project
	source 				= require('vinyl-source-stream'),   //To make 1 file output

	//Include reactify if you use React.js
	babelify      = require('babelify'),						  //Compiles React syntax to ES5

	less 					= require('gulp-less'),							//less compiler
	jade 					= require('gulp-jade'),							//converts jade templates to html

	uglify 				= require('gulp-uglify'),						//uglifies the js
	minifycss 		= require('gulp-minify-css'),				//minifies css files
	//imagemin  		= require('gulp-imagemin'),					//compressing images
	//pngquant 			= require('imagemin-pngquant'), 		//compressing pngs

	//spritesmith 	= require('gulp.spritesmith'),			//concating images in sprite


	//eslint 				= require('gulp-eslint'),						//checks if js written by me is ok
	notify 				= require('gulp-notify'),						//sends notifications to terminal
	plumber 			= require('gulp-plumber'),					//disables interruption
	autoprefixer 	= require('gulp-autoprefixer'),			//sets missing browserprefixer
	browserSync 	= require('browser-sync').create(),	//injects code to all devices
	//spa 					= require('browser-sync-spa'),      //special feature for SPAs
	reload 				= browserSync.reload;
/*****
File Destinations
******/
var target = {
	
	less_src: [													//all less files here
		'less/styles.less'
	],

	start_src: [
		'less/vendors/_vendors.less'
	],

	jade_src: [										//all jade templates here
		'jade/index.jade'
	],

	js_src: [														  //all js that should be linted
		'js/common.js'											//and other js files written by me
	],

	img_src: [
		'img/*'
	],

	js_dest: 	 '../dist/js',							//where to put js		
	css_dest:  '../dist/',								//where to put css
	html_dest: '../dist/',								//where to put html
	img_dest:  '../dist/img'							//where to put minified images 
};


/*****
JADE Task
*****/
gulp.task("jade", function(){
	gulp.src(target.jade_src)
	.pipe(plumber())
	.pipe(jade({
	  pretty: true
	}))
	.pipe(gulp.dest(target.html_dest))
	.pipe(browserSync.reload({stream:true}));
	//.pipe(notify({message: 'Jade processed!'}));
})



/*****
LESS Task
******/
gulp.task("less", function(){
	gulp.src(target.less_src)
	.pipe(plumber())
	.pipe(less())
	.pipe(autoprefixer(
		'last 2 versions',
		'>1%',
		'ie 8',
		'ie 9',
		'ios 6',
		'android 4'
	))
	.pipe(minifycss())
	.pipe(gulp.dest(target.css_dest))
	.pipe(browserSync.reload({stream: true}));
//	.pipe(notify({message: 'Less processed!'}));
});

/****
JS Tasks
****/
//gulp.task('es-lint', function(){
//	gulp.src(target.js_src)
//	.pipe(plumber())
//	.pipe(eslint())
//	.pipe(eslint.format());
//});


/******
IMG Task
******/
//gulp.task('img-min', function(){
//	gulp.src(target.img_src)
//	.pipe(imagemin({
//		progressive : true,
//		svgPlugins	: [{removeViewBox: false}],
//		use 				: [pngquant()]
//	}))
//	.pipe(gulp.dest(target.img_dest));
//});




/*****
******
SCRIPTS for project build
*******
******/
gulp.task('browserify', function(){
	
	var b = browserify();
	
	b.add(target.js_src);

	b.transform(babelify, {presets: ['es2015', 'react', 'stage-0']});

	return b.bundle()
		.on('error', function(err){
			
			console.log(err.message);

			this.emit('end');

		})
		.pipe(source('build.js'))
		.pipe(gulp.dest(target.js_dest))
		.pipe(browserSync.reload({stream:true}));
});


/*****
Browser Sync
*****/
gulp.task('browser-sync', ['less'], function(){
	
	browserSync.init(null, {
		
		server: {
			baseDir: '../',
			injectChanges: true
		},

		startPath: 'dist/'
  });
  gulp.watch('jade/*.jade', ['jade']);
	gulp.watch('less/**/*.less', ['less']);
	gulp.watch(target.js_src, ['browserify']);
 });


/*
 *
 *START Task creates vendors css
 * 
 */

gulp.task('start', function(){
	gulp.src(target.start_src)
	.pipe(plumber())
	.pipe(less())
	.pipe(minifycss())
	.pipe(gulp.dest(target.css_dest));
});



/*
 *
 *UGLIFY Task
 * 
 */
gulp.task('uglify', function() {

	gulp.src('../dist/js/build.js')
	.pipe(uglify())
	.pipe(gulp.dest('../dist/js/'));

});

/*
 *
 *Creating image sprites
 * 
 */
//gulp.task('sprite', function() {
//
//	var spriteData = 
//		gulp.src('img/*.{png,jpg}')
//		.pipe(spritesmith({
//			imgName: 'sprite.png',
//			cssName: 'sprite.less',
//		}));

//	spriteData.img.pipe(gulp.dest('../dist/img/'));
//	spriteData.css.pipe(gulp.dest('../dist/img/'));

//});




/*****
Gulp default task
*****/
gulp.task('default',['browser-sync']);