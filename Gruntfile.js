'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  var appConfig = {
    app: require('./bower.json').appPath || 'src',
    dist: 'dist'
  };

  grunt.initConfig({
    home: appConfig,
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= home.dist %>/{,*/}*'
          ]
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= home.app %>/{,**/}*.js'
        ]
      }
    },
    watch: {
      configFiles: {
        files: ['Gruntfile.js'],
        options: {
          reload: true
        }
      },
      less: {
        files: ['<%= home.app %>/less/{,*/}*.less'],
        tasks: [
          'less:compile',
          'postcss']
      },
      js: {
        files: ['<%= home.app %>/{,*/}*.js'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          './index.html',
          //'<%= home.app %>/{,*/}*.js'
        ]
      }
    },
    postcss: {
      options: {
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer-core')({browsers: 'last 2 versions'})
        ]
      },
      files: [
        '<%= home.app %>/multilingualizer.css'
      ]
    },
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35730
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.'
          ]
        }
      }
    },
    less: {
      compile: {
        options: {
          compress: false,
          paths: ['<%= home.app %>/less']
        },
        files: {
          '<%= home.app %>/multilingualizer.css': [
            '<%= home.app %>/less/multilingualizer.less'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= home.app %>',
            dest: '<%= home.dist %>',
            src: [
              '*.js',
              '*.css'
            ]
          }
        ]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= home.dist %>/multilingualizer.min.js': ['<%= home.dist %>/multilingualizer.js']
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= home.dist %>/multilingualizer.min.css': ['<%= home.dist %>/multilingualizer.css']
        }
      }
    }
  });


  grunt.registerTask('serve', [
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'uglify',
    'cssmin'
  ]);
};
