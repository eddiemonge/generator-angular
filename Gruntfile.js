'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: require('package.json'),
    jshint: {
      all: {
        src: [
          '**/*.js',
          '!test/**/*.js'
        ]
      }
    },
    bump: {
      options: {
        commit: false,
        createTag: false,
        push: false
      }
    },
    changelog: {
      options: {
        dest: 'CHANGELOG.md'
      }
    },
    release: {
      options: {
        bump: false,
        file: 'package.json',
        tagName: 'v<%= version %>',
        commitMessage: 'chore(release): release v%VERSION%'
      }
    }
  });

  grunt.registerTask('release', function() {
    // See https://github.com/vojtajina/grunt-bump#usage for usage on what to
    // use with `grunt release --type=patch`
    var bump = grunt.option('type');
    grunt.task.run([
      'default',
      'bump-only:'+bump,
      'changelog',
      'release'
    ]);
  });
  grunt.registerTask('default', ['jshint']);
};
