module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner:  '/*\n' +
                    ' <%= pkg.name %> v<%= pkg.version %>\n' +
                    ' <%= pkg.homepage %>\n' +
                    '*/\n',

        clean: {
            working: {
                src: ['object-traverse.*']
            }
        },

        uglify: {
            js: {
                src: ['src/traverse.js'],
                dest: 'object-traverse.min.js',
                options: {
                    banner: '<%= banner %>'
                }
            }
        },

        concat: {
            js: {
                options: {
                    banner: '<%= banner %>',
                    stripBanners: true
                },
                src: ['src/traverse.js'],
                dest: 'object-traverse.js'
            }
        },

        // karma
        // https://github.com/karma-runner/grunt-karma
        karma: {
            options: {
                // base path that will be used to resolve all patterns (eg. files, exclude)
                basePath: '',
                // frameworks to use
                // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
                frameworks: ['jasmine'],
                // list of files / patterns to load in the browser
                // list of files to exclude
                exclude: [],
                // preprocess matching files before serving them to the browser
                // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
                preprocessors: {},
                // web server port
                port: 9876,
                // enable / disable colors in the output (reporters and logs)
                colors: true,
                //
                files: [
                    'src/*.js',
                    'test/*.js'
                ],
                //
                plugins : [
                    'karma-jasmine',
                    'karma-chrome-launcher',
                    'karma-phantomjs-launcher'
                ]
            },
            // http://karma-runner.github.io/0.12/config/configuration-file.html
            phantom: {
                // level of logging
                // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
                logLevel: 'INFO',
                // enable / disable watching file and executing tests whenever any file changes
                autoWatch: false,
                // start these browsers
                // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
                browsers: ['PhantomJS'],
                // Continuous Integration mode
                // if true, Karma captures browsers, runs the tests and exits
                singleRun: true
            },
            chrome: {
                // level of logging
                // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
                logLevel: 'INFO',
                // enable / disable watching file and executing tests whenever any file changes
                autoWatch: false,
                // start these browsers
                // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
                browsers: ['Chrome'],
                // Continuous Integration mode
                // if true, Karma captures browsers, runs the tests and exits
                singleRun: true
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['clean', 'concat', 'uglify']);
    grunt.registerTask('test', ['karma:phantom']);
};
