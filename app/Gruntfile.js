(function() {

    module.exports = function(grunt) {
        // config
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            clean: ['build/'],
            // concat only used when trying a single file build
            concat: {
                options: { separator: ';' },
                prod: {
                    src: ['src/*.js', 'src/js/*.js', 'src/js/**/*.js'],
                    dest: 'build/js/main.js'
                }
            },
            uglify: {
                options: {
                    banner: '/*! <%= pkg.name %> | version: <%= pkg.version %> | built: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                // single file build
                // doesn't work correctly, more trouble than it's worth
                // all modules would need to be defined with names like 'js/folder/filename'
                single: {
                    files: {
                            'build/js/main.js': ['<%= concat.prod.dest %>']
                        }
                },
                multi: {
                    files: [{
                        expand: true,
                        cwd: 'src',
                        src:['*.js', 'js/*.js', 'js/**/*.js'],
                        dest: 'build/',
                        ext: '.js'
                    }]
                }

            },
            htmlmin: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                prod: {
                    files: [{
                        expand: true,
                        cwd: 'src',
                        src:['*.html', '**/**/**/**/*.html'],
                        dest: 'build/',
                        ext: '.html'
                    }]
                }
            },
            copy: {
                /*
                css: {
                    files: [
                        {
                            expand: 'true',
                            flatten: 'true',
                            src: ['src/stylesheets/libs/**'],
                            dest: 'build/stylesheets/libs/',
                            filter: 'isFile'
                        }
                    ]
                },
                */
                assets: {
                    files: [{
                        expand: true,
                        cwd: 'src',
                        src:['img/**', 'config.json', 'stylesheets/**'],
                        dest: 'build/'
                    }]
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-contrib-copy');

        grunt.registerTask('default', ['clean', 'uglify:multi', 'htmlmin', 'copy']);
    };

})();
