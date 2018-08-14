const concat = require('concat-files');
concat([
  './dist/cnblogs-md/runtime.js',
  './dist/cnblogs-md/polyfills.js',
  './dist/cnblogs-md/main.js',
], './dist/app.js', function (err) {
  if (err) throw err
  console.log('done');
});
