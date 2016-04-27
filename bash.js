var commands = require('./commands');

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  // var cmd = data.toString().substring(0,data.indexOf(' '))||data.toString().trim();
  // // console.log(cmd);
  // var args = data.toString().substring(data.indexOf(' ')+1).trim();

  var cmdString = data.toString().trim();
  var cmdList = cmdString.split(/\s*\|\s*/g)

  var cmd = cmdList[0].substring(0,data.indexOf(' '))||cmdList[0];
  var args = cmdList[0].substring(data.indexOf(' ')+1);
  var pipee = cmdList[1];


  var done = function(output){
    var count = 0;
    if(pipee){
      console.log(output.toString());
      commands[pipee](output.toString(),null, done);
      count ++;
    }

    if( count === 0 ){
      process.stdout.write(output);

      // process.stdout.write(output);
      process.stdout.write('prompt > ');
    }
  };
  // var cmd = data.toString().trim(); // remove the newline
  commands[cmd](null,args, done);
  // process.stdout.write(commands[cmd]());

});
