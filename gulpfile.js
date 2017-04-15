var gulp     = require("gulp");
var sass     = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var del      = require("del");
var htmlmin  = require("gulp-htmlmin");

//Deletar arquivos /dist/css/.
gulp.task('deleta-dist-css',function(){
	del("./dist/css/*.css");
});

//Deletar arquivos /source/scss/.
gulp.task('deleta-source-scss',function(){
	del("./source/scss/*.css");
});

//Deletar arquivo index.html da pasta /dist/.
gulp.task('deleta-dist-index',function(){
	del("./dist/index.html");
});

//Compilar scss para css.
gulp.task('compila-scss',function(){
	return gulp.src('./source/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./source/scss/'))
});

//Deleta os arquivos .css das pastas, compila na pasta scss e depois minifica enviando a dist/css.
gulp.task('minifica-compila',['deleta-dist-css','deleta-source-scss','compila-scss'],function(){
	return gulp.src('./source/scss/*.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest('./dist/css/'));
});

//Minificar html e enviar para pasta dist.
gulp.task('minifica-html',['deleta-dist-index'],function(){
	return gulp.src('./index.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('./dist/'));
});

//Watch que vai escutar para ver se foi feita alguma alteração nos arquivos scss e no index.html.
gulp.task('background',function(){
	gulp.watch('./source/scss/*.scss',['minifica-compila']);
	gulp.watch('./index.html',['minifica-html']);	
});


