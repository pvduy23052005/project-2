const Task = require("../models/task.model");

// [get] /api/v1/tasks .
module.exports.index = async (req, res) => {
  const status = req.query.status;

  let find = {
    deleted: false,
  };

  if (status) {
    find.status = status;
  }

  const tasks = await Task.find(find);
  res.json(tasks);
};

// [get] api/v1/tasks/detail/:id ;
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const task = await Task.findOne({
    _id: id,
    deleted: false,
  });
  res.json(task);
};
