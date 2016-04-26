var fs = require('fs');
var request = require('request');


var print= function (message) {
    process.stdout.write(message);
    process.stdout.write('prompt > ');
}



module.exports = {
  echo: function(file, done){
    var output = "";
    if(file[0] === '$'){
      var newFile = file.substr(1);
      output+=process.env[newFile] + '\n';

    }
    else{
      output+= file + '\n';
    }
    done(output);
  },
  pwd: function(file, done){
    done(process.cwd() +'\n');

  },
  curl:function(url, done){

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
      //  console.log(body);
         done(body+'\n') // Show the HTML for the Google homepage.
       }

    })

  },
  sort: function (file, done) {
    fs.readFile(file, function(err, data){
      var output = "";
      if (err) throw err;
      var lines = data.toString().split('\n').sort();
      lines.forEach(function (line) {
        output+=line.toString() + "\n";
      })

    done(output)
    })
  },
  wc: function (file, done) {
    fs.readFile(file, function(err, data){
      if (err) throw err;
        done(data.toString().split('\n').length
 + "\n");
    })
  },

  uniq: function(file, done){
    fs.readFile(file, function(err, data){
      if (err) throw err;
      var lines = data.toString().split('\n');
      var output = lines[0] + '\n';
      for(var i = 1; i < lines.length; i++){
          if(lines[i] != lines[i-1]){
            output += lines[i] + '\n';
          }
      }
      done(output);
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
