/*
 * @Author: Thiago
 * @Date:   2020-05-24 00:09:57
 * @Last Modified by:   Thiago
 * @Last Modified time: 2020-05-24 22:32:26
 */
module.exports = function(grunt) {
    require('jit-grunt')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            src: [

            ]
        },
        less: {
            development: {
                options: {
                    paths: ['styles/css']
                },
                files: {
                    // destination file and source file
                    'styles/css/layout.css': 'styles/less/helper.less'
                }
            }
        },
        concat_css: {
            options: {
                // Task-specific options go here.
            },
			files: {
				'styles/css/layout.css': ['styles/css/base.css', 'styles/css/fonts.css', 'styles/css/helper.css'],
			}
        },
        watch: {
            styles: {
                files: ['**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
        }

    });
    
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.registerTask('default', ['less', 'concat_css', 'watch']);
}