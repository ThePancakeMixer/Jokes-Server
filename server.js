const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/testdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Jones");
});

var y = "Hello World"; 
var JokesSchema = new mongoose.Schema({
    joke: String
  });
JokesSchema.methods.success = function() {
      console.log("Joke saved!");
  }

var Joke = mongoose.model('Joke', JokesSchema);



  

app.get('/', (req, res) => res.send("Hello World"))



app.post('/', function (req, res) {
    let joke_string = req.query.joke; 
    let joke_instance = new Joke({"joke":joke_string});
    console.log(joke_instance);
    joke_instance.save(function(err,joke_instance){
        if (err) return console.error(err);
        joke_instance.success();
    });
    res.send("POST SUCCESS")
})



app.listen(port, () => console.log(`Exampsle app listening on port ${port}!`))