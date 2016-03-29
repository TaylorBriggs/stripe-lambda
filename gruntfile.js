process.on('uncaughtException', function(err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  console.error(err.stack);
  console.log(err);
  process.exit(1)
});

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  require('./tasks/build_event')(grunt);

  grunt.loadNpmTasks('grunt-aws-lambda');

  grunt.initConfig({
      build_event: {
        all:{}
      },
      lambda_invoke: {
          default: {
              options: {
                  // Task-specific options go here.
              }
          }
      },
      lambda_package: {
          default: {
              options: {
                include_files : [".env"]
                  // Task-specific options go here.
              }
          }
      },
      lambda_deploy: {
          default: {
              arn: 'arn:aws:lambda:'+process.env.AWS_REGION+':'+process.env.AWS_ACCOUNT_ID+':function:'+process.env.AWS_FUNCTION_NAME,//:123456781234:function:my-function',
              options: {
                enableVersioning: true,
                region: process.env.AWS_REGION
                  // Task-specific options go here.
              }
          }
      }
  });

  grunt.registerTask('run', ['build_event','lambda_invoke']);

  grunt.registerTask('deploy', ['run', 'build_event', 'lambda_package', 'lambda_deploy']);

};
