module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        },
        jshintrc: true
      }
    },
    browserify: {
      dist: {
        files: {
          'build/app.js': ['js/**/*.js', 'js/**/*.jsx']
        },
        options: {
          browserifyOptions: {
            debug: true
          },
          transform: [[
            'babelify', 
            { 
              "experimental": true, 
              "sourceMapRelative": __dirname,
              "sourceMap": true
            } 
          ]]
        }
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'build/main.css': 'sass/main.scss',       // 'destination': 'source'
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'sass', 'browserify']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-sass');



  grunt.registerTask('default', ['jshint', 'sass', 'browserify:dist']);

};