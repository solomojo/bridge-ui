/* global require, process */

//minifies code to all.min.js
//modifies manifest.json to point to minified code
//copies current manifest.json to dev-manifest.json
var command_line_args = require('yargs').argv;
function printUsage() {
  console.log('USAGE: gulp publish :: generates zipme folder with minified contents');
  console.log('USAGE: gulp dev --url=yourDevUrl :: writes config.dev.json with dev url and updates manifest.json permissions');
}
if(command_line_args._.length === 0) {
  printUsage();
  process.exit();
}
var through = require('through2');
var jsdom = require('jsdom');
var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlreplace = require('gulp-html-replace');
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-clean-css');
var gutil = require('gulp-util');
var path = require('path');
var karma = require('karma');
var karmaParseConfig = require('karma/lib/config').parseConfig;

//------------------------------------------------------------------------------
var scripts = [];
ncp.limit = 10;
//------------------------------------------------------------------------------

gulp.task('copyToZipMe', function(getScripts) {
  var ignoreList = [
    'zipme',
    'node_modules',
    'bower_components',
    'bower.json',
    'package.json',
    '.git',
    '.gitignore',
    'config.dev.json',
    'init.js',
    'popup.js',
    'popup.html',
    'gulpfile.js',
    'karma.conf.js',
    'controllers',
    'factories',
    'directives',
    'spec',
    'coverage'
  ];
  var filter = function(name) {
    for(var key in ignoreList) {
      if(name.indexOf(ignoreList[key]) !== -1) {
        return false;
      }
    }
    return true;
  };
  rimraf('zipme', function(err) {
    ncp('./', 'zipme/',
    {filter:filter},
    function(err) {
      if(err) {return console.log(err);}
      getScripts(err);
    });
  });
});
//------------------------------------------------------------------------------
gulp.task('getScripts', ['copyToZipMe'], function(minifyScripts) {
  fs.readFile('manifest.json', 'utf8', function(err, data) {
    var manifest = JSON.parse(data);
    console.log("Current Extension Version: ", manifest.version);
    var popupHtmlPath = "popup/popup.html";
    jsdom.env(popupHtmlPath,["http://code.jquery.com/jquery.js"], function(err, window) {
      var $ = window.$;
      $("script").each(function() {
        scripts.push('popup/' + $(this).attr('src'));
      });
      scripts.pop();
      minifyScripts(null);
      gulp.src(popupHtmlPath)
        .pipe(htmlreplace({
          'js':'all.min.js',
          'css':'angular-csp.css',
          'material': 'angular-material.min.css'
        }))
        .pipe(gulp.dest('zipme/popup'));
    });
  });
});
//------------------------------------------------------------------------------
// Concatenate & Minify JS
gulp.task('minScripts',['getScripts'], function() {
  console.log('Minifying: ', scripts);
  return gulp.src(scripts)
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('zipme/popup'));
});
//------------------------------------------------------------------------------
gulp.task('tidyUp', ['minScripts'], function() {
  var allMinContent = fs.readFileSync('zipme/popup/all.min.js').toString();
  allMinContent = allMinContent.replace('config.dev.json','config.json');
  fs.writeFile('zipme/popup/all.min.js', allMinContent, function(err) {
    if(err){console.log(err);};
  });
  ncp('./bower_components/angular/angular-csp.css','zipme/popup/angular-csp.css');
  ncp('./bower_components/angular-material/angular-material.min.css','zipme/popup/angular-material.min.css');
  fs.readFile('zipme/manifest.json', 'utf8', function(err, data) {
    var manifest = JSON.parse(data);
    var toDelete = [];
    for(var i = 0; i < manifest.permissions.length; i++) {
      if(manifest.permissions[i].indexOf('ngrok') !== -1) {
        toDelete.push(i);
      }
    }
    for(var i = toDelete.length - 1; i >= 0; i--) {
      manifest.permissions.splice(toDelete[i], 1);
    }
    fs.writeFile('zipme/manifest.json', JSON.stringify(manifest, null, 4));
  });
  var pubReady = 'console.log = function(){};'
  fs.writeFile('zipme/popup/disableConsole.js', pubReady, function() {
    gulp.src(['zipme/popup/disableConsole.js', 'zipme/popup/all.min.js'])
            .pipe(concat('all.min.js'))
            .pipe(gulp.dest('zipme/popup'))
            .pipe(through.obj(function(file, enc, cb) {
                fs.unlink('zipme/popup/disableConsole.js');
                cb(null, file);
              }
            ));
  });
  return gulp.src('./options/*.js')
          .pipe(concat('options.js'))
          .pipe(uglify())
          .pipe(gulp.dest('zipme/options'));
});
//------------------------------------------------------------------------------
gulp.task('changeDevAddress', function() {
    var url = command_line_args.url;
    if(url === undefined || url === '') {
      return printUsage();
    }
    fs.readFile('popup/config.json', 'utf8', function(err, data) {
      if(err) {throw err;}
        var configObj = JSON.parse(data);
        configObj.mwHost = command_line_args.url;
        fs.writeFile('popup/config.dev.json', JSON.stringify(configObj, null, 4));
    });
});
//------------------------------------------------------------------------------
gulp.task('usage', printUsage);
//------------------------------------------------------------------------------
gulp.task('dev', ['changeDevAddress']);
gulp.task('publish', ['copyToZipMe','getScripts', 'minScripts','tidyUp']);
gulp.task('default', ['usage']);

// Process css
var cssGlob = ['popup/popup.scss', 'popup/modules/**/*.scss', 'popup/modules/**/**/*.scss', 'popup/modules/**/**/**/*.scss'];
gulp.task('css', function () {
	gulp.src(cssGlob)
		.pipe(concat('condensed.scss'))
		.pipe(gulp.dest('popup/css/'))
		.pipe(sass())
		.pipe(autoprefixer({
			remove: false
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest('popup/css/'));
});

// Static Server + watching scss/html files
gulp.task('watch', ['css'], function() {

	gulp.watch(cssGlob, ['css']);
  gulp.watch("popup/**/*.scss", ['css']);
  gulp.watch("popup/modules/**/**/*.scss", ['css']);
	gulp.watch("popup/modules/**/**/**/*.scss", ['css']);
  gulp.watch("popup/popup.scss", ['css']);
});


function runKarma(configFilePath, options, cb) {

	configFilePath = path.resolve(configFilePath);

	var Server = karma.Server;
	var log=gutil.log, colors=gutil.colors;
	var config = karmaParseConfig(configFilePath, {});

    Object.keys(options).forEach(function(key) {
      config[key] = options[key];
    });

	Server.start(config, function(exitCode) {
		log('Karma has exited with ' + colors.red(exitCode));
		cb();
		process.exit(exitCode);
	});
}

 /** single run */
 gulp.task('test', function(cb) {
 	runKarma('karma.conf.js', {
 		autoWatch: false,
 		singleRun: true
 	}, cb);
 });

/** continuous ... using karma to watch  */
gulp.task('test-dev', function(cb) {
	runKarma('karma.conf.js', {
		autoWatch: true,
		singleRun: false
	}, cb);
});

// Default Task
