const Task = require("../models/task.model");

// [get] /api/v1/tasks .
module.exports.index = async (req, res) => {
  const status = req.query.status;
  const sortKey = req.query.sortKey;
  const sortValue = req.query.sortValue;

  let find = {
    deleted: false,
  };
  let sort = {};

  if (status) {
    find.status = status;
  }
  if (sortKey && sortValue) {
    sort[sortKey] = sortValue;
  }

  const tasks = await Task.find(find).sort(sort);
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
