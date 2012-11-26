/*
 * grunt-contrib-copy
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Chris Talkington, contributors
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    test_vars: {
      name: 'grunt-contrib-copy',
      version: '0.1.0'
    },

    // Configuration to be run (and then tested).
    copy: {
      main: {
        options: {
          cwd: 'test/fixtures'
        },
        files: {
          'tmp/copy_test_files/': ['*'],
          'tmp/copy_test_v<%= test_vars.version %>/': ['**']
        }
      },

      flatten: {
        options: {
          flatten: true
        },
        files: {
          'tmp/copy_test_flatten/': ['test/fixtures/**']
        }
      },

      minimatch: {
        options: {
          cwd: 'test/fixtures',
          minimatch: {
            dot: true
          }
        },
        files: {
          'tmp/copy_minimatch/': ['*']
        }
      },

      single: {
        files: {
          'tmp/single.js': ['test/fixtures/test.js']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);
};