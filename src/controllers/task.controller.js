const Task = require("../models/task.model");

// [get] /api/v1/tasks .
module.exports.index = async (req, res) => {
  const tasks = await Task.find({ deleted: false });
  res.json(tasks);
};

// [get] api/v1/tasks/detail/:id ;
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const task = await Task.findOne({
    _id: id,
    deleted: false,
  });
  console.log(task);
  res.json(task);
};
