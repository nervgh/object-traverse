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
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['clean', 'concat', 'uglify']);
};
