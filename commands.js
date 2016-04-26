var fs = require('fs');
var prompt = function(){
  return process.stdout.write('prompt > ');
}

module.exports = {
  echo: function(file){
    if(file[0] === '$'){
      var newFile = file.substr(1);
      process.stdout.write(process.env[newFile] + '\n');

    }
    else{
      process.stdout.write(file + '\n');
    }
    prompt();
  },
  pwd: function(file){
    process.stdout.write(process.cwd() +'\n');
    prompt();

  },
  sort: function (file) {
    fs.readFile(file, function(err, data){
      if (err) throw err;
      var output = data.toString().split('\n').sort();
      output.forEach(function (line) {
        process.stdout.write(line.toString() + "\n");
      })

      prompt();
    })
  },
  wc: function (file) {
    fs.readFile(file, function(err, data){
      if (err) throw err;
        process.stdout.write(       data.toString().split('\n').length
 + "\n");
      prompt();
    })
  },

  uniq: function(file){
    fs.readFile(file, function(err, data){
      if (err) throw err;
      var output = data.toString().split('\n');
      process.stdout.write(output[0] + '\n');
      for(var i = 1; i < output.length; i++){
          if(output[i] != output[i-1]){
            process.stdout.write(output[i] + '\n');
          }
      }
      prompt();
    });
  },

  date: function(file){
    process.stdout.write(new Date().toString()+ '\n');
    prompt();

  },
  cat: function(file){
    fs.readFile(file, function(err, data){
      if (err) throw err;
      process.stdout.write(data);
      prompt();
    })
  },
  head: function(file){
    fs.readFile(file, function(err, data){
      if (err) throw err;
      var output = data.toString().split('\n').slice(0,5)
      output.forEach(function (line) {
        process.stdout.write(line.toString() + "\n");
      })

      prompt();
    })
  },
  tail: function(file){
    fs.readFile(file, function(err, data){
      if (err) throw err;
      var output = data.toString().split('\n').slice(-5)
      output.forEach(function (line) {
        process.stdout.write(line.toString() + "\n");
      })

      prompt();
    })
  },

  ls: function(file){
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
        process.stdout.write(file.toString() + "\n");
      })
      prompt();
    });
  }
};
