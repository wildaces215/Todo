const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskSchema = new Schema({
  task: "string",
  description: "string"
});
mongoose.model("task", taskSchema);

let task = (module.exports = mongoose.model("task", taskSchema));
