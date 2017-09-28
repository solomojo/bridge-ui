// Karma configuration
// Generated on Fri Sep 23 2016 08:35:45 GMT-0600 (MDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './node_modules/angular/angular.js',                             // angular
      './node_modules/angular-ui-router/release/angular-ui-router.js', // ui-router
      './node_modules/angular-mocks/angular-mocks.js',                 // loads our modules for tests
      './popup/modules/factories/*.js',
      './popup/modules/factories/**/*.js',
      './popup/modules/directives/*.js',
      './popup/modules/directives/**/*.js',
      './popup/modules/filters/*.js',
      './popup/modules/filters/**/*.js',
      './popup/modules/components/*.js',
      './popup/modules/components/**/*.js',
      './popup/modules/controllers/*.js',
      './popup/modules/controllers/**/*.js',
      './popup/popup.js',                                                  // our angular app
      './popup/modules/factories/**/*.spec.js',
      './popup/modules/controllers/**/*.spec.js',
      './popup/modules/components/**/*.spec.js',
      './popup/modules/filters/**/*.spec.js',
      './popup/modules/directives/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './popup/modules/factories/!(*.spec)*.js': ['coverage'],
      './popup/modules/factories/**/!(*.spec)*.js': ['coverage'],
      './popup/modules/components/!(*.spec)*.js': ['coverage'],
      './popup/modules/components/**/!(*.spec)*.js': ['coverage'],
      './popup/modules/controllers/!(*.spec)*.js': ['coverage'],
      './popup/modules/controllers/**/!(*.spec)*.js': ['coverage'],
      './popup/modules/directives/!(*.spec)*.js': ['coverage'],
      './popup/modules/directives/**/!(*.spec)*.js': ['coverage'],
      './popup/modules/filters/**/!(*.spec)*.js': ['coverage'],
      './popup/modules/filters/!(*.spec)*.js': ['coverage']
    },

    // add the coverage plugin
    plugins: [ 'karma-jasmine', 'karma-chrome-launcher', 'karma-coverage', 'karma-phantomjs-launcher'],

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
