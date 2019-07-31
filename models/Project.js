const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  startDate: { type: String },
  dueDate: { type: String },
  timeSpent: { type: String },
  complete: { type: Boolean },
  isPublic: { type: Boolean },
  images: [{ type: String }]
});
//TODO: Missing tasks
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
