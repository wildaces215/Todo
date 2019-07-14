const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
const taskSchema = require("./models/models");

mongoose.connect("mongodb://localhost/theTasks");
let db = mongoose.connection;
app = express();

//app.use(cors);
//app.options('*', cors())


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
  next();
});


db.on("error", err => {
  console.log(err);
});

db.on("open", () => {
  console.log("Connected to Mongodb");
});

app.use(bodyParser.json());

//Create a new post
app.post("/api/tasks/new", async (req, res, next) => {
  let newTask = new taskSchema();
  newTask.task = req.body.task;
  newTask.description = req.body.description;
  newTask.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.json({ info: "New entry added" });
    }
  });
});
app.get("/api/tasks/all", async (req, res, next) => {
  var data = await taskSchema.find().exec();
  res.send(data);
});
//Get a single task
app.get("/api/tasks/:id", async (req, res, next) => {
  var data = await taskSchema.findById(req.params.id).exec();
  res.send(data);
});
//Update task
app.put("/api/update/:id", async (req, res, next) => {
  var data = await taskSchema.findById(req.params.id).exec();
  data.set(req.body);
  var data_return = await data.save();
  res.send(data_return);
});
//Delete Task
app.delete("/api/tasks/delete/:id",async (req,res,next)=>{
  var data = await taskSchema.deleteOne({_id:req.params.id}).exec();
  res.send(data);
});

app.listen(4000, (req, res) => {
  console.log("app listening on 4000");
});
