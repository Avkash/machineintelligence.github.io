/**
 * Created by AvkashChauhan on 8/28/16.
 */

module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // all of our configuration will go here

        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                debug: true// use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            //build: ['src/js/individual/**/*.js']
        },
        concat: {
            build: {
                files: {
                    'js/app.models.js' : ['js/app/domain/models/**'],
                    'js/app.domain.js': ['js/app/domain/bindings/**', 'js/app/domain/services/**']
                }
            }
        },
        less: {
            build: {
                files: {
                    "css/hub.css": "less/hub.less"
                }
            }
        },
        bake: {
            build: {
                files: {
                    "index.html": "_index.html"
                }
            }
        },
        watch: {

            less: {
                files: [
                    'less/**/*.less'
                ],
                tasks: ['less']
            },
            bake: {
                files: [
                    'includes/**',
                    'modals/**',
                    '_index.html'
                ],
                tasks: ['bake']
            },
            concat: {
                files: ['js/app/**'],
                tasks: ['concat']
            }
        }
    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('runall', [
        'less',
        //'concat',
        'jshint',
        'bake'
    ]);

    grunt.registerTask('default', ['watch']);

};