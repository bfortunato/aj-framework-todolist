var express = require("express");
var bodyParser = require('body-parser');

var todos = require("./todos");

var app = express();

app.use(express.static("../platforms/web"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get("/todos", function(req, resp) {
    resp.send(JSON.stringify(todos.get()));
});

app.post("/todos", function(req, resp) {
    var text = req.body.text;
    todos.create(text);
    resp.send(JSON.stringify(todos.get()));
});

app.post("/todos/:id", function(req, resp) {
    var id = req.params.id;
    var complete = req.body.complete == "true";
    todos.complete(id, complete);
    resp.send(JSON.stringify(todos.get()));
});

app.delete("/todos/:id", function(req, resp) {
    var id = req.params.id;
    todos.remove(id);
    resp.send(JSON.stringify(todos.get()));
});


var server = app.listen(8000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Todo List app server listening at http://%s:%s", host, port)
});