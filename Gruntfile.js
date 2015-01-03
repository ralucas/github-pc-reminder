'use strict';

var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var clientConfig = {
    app: 'client/app',
    dist: 'client/dist'
  };

  // Project configuration.
  grunt.initConfig({

    client: clientConfig,

    bump: {
      options: {
        createTag: true,
        push: true,
        pushTo: 'origin'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'tests/coverage/blanket',
          grep: grunt.option('grep'),
          colors: true
        },
        src: ['tests/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'tests/coverage/coverage.html'
        },
        src: ['tests/*.js']
      }
    },

    jsdoc: {
      dist: {
        src: ['app/*'],
        options: {
          destination: 'docs',
          configure: 'docs/conf.json'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        force: true,
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['app/*',
          '<%= client.app %>/scripts/{,*/}*.js',
          '!<%= client.app %>/scripts/vendor/*',
          'test/spec/{,*/}*.js'
        ]
      }
    },

    watch: {
      options: {
        nospawn: true,
        livereload: true
      },
      server: {
        files: ['.rebooted'],
        options: {
          livereload: true
        }
      },
      client: {
        livereload: {
          options: {
            livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
          },
          files: [
            '<%= client.app %>/*.html',
            '{.tmp,<%= client.app %>}/styles/{,*/}*.css',
            '{.tmp,<%= client.app %>}/scripts/{,*/}*.js',
            '<%= client.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= client.app %>/scripts/templates/*.{ejs,mustache,hbs}',
            'test/spec/**/*.js'
          ]
        },
        jst: {
          files: ['<%= client.app %>/scripts/templates/*.ejs'],
          tasks: ['jst']
        },
        test: {
          files: ['<%= client.app %>/scripts/{,*/}*.js', 'test/spec/**/*.js'],
          tasks: ['test:true']
        },
        sass: {
          files: ['<%= client.app %>/styles/sass/*.scss'],
          tasks: ['compass']
        },
        files: ['.rebooted']
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon', 'node-inspector', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    nodemon: {
      dev: {
        script: 'server/bin/www',
        options: {
          nodeArgs: ['--debug'],
          env: {
            PORT: '3000'
          },
          ignore: [''],
          ext: 'js, jade, html'
        }
      }
    },

    'node-inspector': {
      custom: {
        options: {
          'web-port': 8080,
          'web-host': '0.0.0.0',
          'debug-port': 5858,
          'save-live-edit': true,
          'no-preload': false,
          'stack-trace-limit': 50,
          'hidden': []
        }
      }
    },

    connect: {
      options: {
        port: grunt.option('port') || 3010,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, clientConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, clientConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, clientConfig.dist)
            ];
          }
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      },
      test: {
        path: 'http://localhost:<%= connect.test.options.port %>'
      }
    },

    clean: {
      dist: ['.tmp', '<%= client.dist %>/*'],
      server: '.tmp'
    },

    // not enabled since usemin task does concat and uglify
    // check index.html to edit your build targets
    // enable this task if you prefer defining your build targets here
    /*uglify: {
        dist: {}
    },*/
    useminPrepare: {
      html: '<%= client.app %>/index.html',
      options: {
        dest: '<%= client.dist %>'
      }
    },

    usemin: {
      html: ['<%= client.dist %>/{,*/}*.html'],
      css: ['<%= client.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= client.dist %>']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= client.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= client.dist %>/images'
        }]
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= client.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= client.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= client.app %>',
          src: '*.html',
          dest: '<%= client.dist %>'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= client.app %>',
          dest: '<%= client.dist %>',
          src: [
            '*.{ico,txt}',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/{,*/}*.*',
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= client.dist %>/.htaccess'
        }]
      }
    },
    
    jst: {
      compile: {
        files: {
          '<%= client.app %>/scripts/templates.js': ['<%= client.app %>/scripts/templates/*.ejs']
        }
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= client.dist %>/scripts/{,*/}*.js',
            '<%= client.dist %>/styles/{,*/}*.css',
            '<%= client.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '/styles/fonts/{,*/}*.*',
          ]
        }
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'client/app/styles/sass',
          cssDir: 'client/app/styles/css',
          output: 'compressed'
        }
      }
    }

  });

  grunt.registerTask('createDefaultTemplate', function () {
    grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
    }

    if (target === 'test') {
      return grunt.task.run([
        'clean:server',
        'createDefaultTemplate',
        'jst',
        'connect:test',
        'open:test',
        'watch'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'createDefaultTemplate',
      'jst',
      'connect:livereload',
      'open:server',
      'watch'
    ]);
  });

  grunt.registerTask('test', function (isConnected) {
      isConnected = Boolean(isConnected);
      var testTasks = [
              'clean:server',
              'createDefaultTemplate',
              'jst',
              'connect:test',
              'mocha',
          ];

      if(!isConnected) {
          return grunt.task.run(testTasks);
      } else {
          // already connected so not going to connect again, remove the connect:test task
          testTasks.splice(testTasks.indexOf('connect:test'), 1);
          return grunt.task.run(testTasks);
      }
  });

  grunt.registerTask('build', [
      'clean:dist',
      'createDefaultTemplate',
      'compass',
      'jst',
      'useminPrepare',
      'htmlmin',
      'imagemin',
      'concat',
      'cssmin',
      'uglify',
      'copy',
      'rev',
      'usemin'
  ]);

  grunt.registerTask('heroku', [
      'clean:dist',
      'createDefaultTemplate',
      'jst',
      'useminPrepare',
      'htmlmin',
      'concat',
      'cssmin',
      'uglify',
      'copy',
      'rev',
      'usemin'
  ]);

  grunt.registerTask('client', [
      'jshint',
      'test',
      'build'
  ]);

  grunt.registerTask('server', ['build', 'concurrent']);

  grunt.registerTask('test', 'mochaTest');

  grunt.registerTask('docs', 'jsdoc');

};
