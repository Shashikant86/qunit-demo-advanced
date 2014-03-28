/*global module*/
/*jshint camelcase:false*/ // because of gruntConfig.qunit_junit
module.exports = function (grunt) {
    'use strict';

    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json')
    };

    // convenience
    grunt.registerTask('default', ['qunit_junit', 'qunit', 'csslint']);


    // clean
    grunt.loadNpmTasks('grunt-contrib-clean');
    gruntConfig.clean = {
        output: ['report']
    };

    grunt.registerTask('lint', 'jshint');

    // test
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-qunit-istanbul');
    gruntConfig.qunit = {
        src: ['src/test/index.html'],
        options: {
        coverage: {
          src: ['src/js/**/*.js'],
          instrumentedFiles: 'temp/',
          htmlReport: 'report/coverage',
          coberturaReport: 'report/',
          linesThresholdPct: 20
        }
        }
    };
    grunt.loadNpmTasks('grunt-qunit-junit');
    gruntConfig.qunit_junit = {
        options: {
            dest: 'report/'
        }
    };

    // coverage
    grunt.loadNpmTasks('grunt-qunit-cov');
    gruntConfig['qunit-cov'] = {
        test:
        {
            minimum: 0.7,
            baseDir: 'src',
            srcDir: 'src/js',
            depDirs: ['src/lib', 'src/test'],
            outDir: 'report/qunit-coverage',
            testFiles: ['src/test/index.html']
        }
    };
    grunt.registerTask('coverage', 'qunit-cov');

    // css lint

    grunt.loadNpmTasks('grunt-contrib-csslint');
    gruntConfig.csslint = {
      options: {
    formatters: [
      {id: 'junit-xml', dest: 'report/csslint_junit.xml'},
      {id: 'checkstyle-xml', dest: 'report/csscheckstyle.xml'}
    ]
  },
  strict: {
    options: {
      import: false
    },
    src: ['doc/**/*.css']
  }
};



    // grunt
    grunt.initConfig(gruntConfig);
};
