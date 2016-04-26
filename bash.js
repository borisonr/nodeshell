var commands = require('./commands');

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().substring(0,data.indexOf(' '))||data.toString().trim();
  // console.log(cmd);
  var args = data.toString().substring(data.indexOf(' ')+1).trim();

  var done = function(output){
    process.stdout.write(output);
    process.stdout.write('prompt > ');
  };
  // var cmd = data.toString().trim(); // remove the newline
  commands[cmd](args, done);
  // process.stdout.write(commands[cmd]());

});
