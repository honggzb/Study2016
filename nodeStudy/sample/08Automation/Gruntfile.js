module.exports = function(grunt) {
  grunt.initConfig({
    jshint:{
      files: ["*.js", "lib/*.js","test/*.js"],
      options:{
        esnext: true,  //允许ECMAScript 6规约
        globals:{
          jQuery: true  //use jQuery under global
        }
      }
    },
    clean: {
       src: ["public/css/*.css"]
    },
    less:{
      production: {
        files:{
          "public/css/style.css": ["less/*.less"]
        }
      }
    },
    autoprefixer: {
      single_file:{
        src: "public/css/style.css",
        dest: "public/css/style.css"
      }
    },
    browserify:{
      client: {
        src: ["app-client.js"],
        dest: "public/js/bundle.js"
      }
    },
    watch: {
      css: {
        files: ["less/*.less"],
        tasks: ["css"]
      },
      scripts:{
        files:["app-client.js","public/*.js"],
        tasks:["jshint","browserify"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("css",["clean", "less","autoprefixer"]);
  grunt.registerTask("js",["browserify"]);
  grunt.registerTask("default",["jshint","css","js"]);
};
