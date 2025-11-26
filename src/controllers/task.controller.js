const Task = require("../models/task.model");
const paginationHelper = require("../helpers/pagination.helper");

// [get] /api/v1/tasks .
module.exports.index = async (req, res) => {
  const status = req.query.status;
  const sortKey = req.query.sortKey;
  const sortValue = req.query.sortValue;

  let find = {
    deleted: false,
  };
  let sort = {};
  let objectPagination = paginationHelper(
    {
      itemLimit: 4,
      page: 1,
    },
    req.query
  );

  if (status) {
    find.status = status;
  }
  if (sortKey && sortValue) {
    sort[sortKey] = sortValue;
  }

  if (req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    find["title"] = regex;
  }

  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.itemLimit)
    .skip(objectPagination.itemSkip);

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

// [patch] api/v1/tasks/change-status/:id ;
module.exports.changeStatus = async (req, res) => {
  const id = req.params.id;
  try {
    await Task.updateOne(
      {
        _id: id,
      },
      {
        status: req.body.status,
      }
    );
    res.status(200).json({
      message: "Status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// [patch] api/v1/tasks/change-multi ;
module.exports.changeMulti = async (req, res) => {
  try {
    const { listId, key, value } = req.body;
    // key : status , value : "finish".

    switch (key) {
      case "status":
        await Task.updateMany(
          {
            _id: { $in: listId },
          },
          {
            status: value,
          }
        );
        break;

      default:
        break;
    }
    res.status(200).json({
      message: "Tasks updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// [patch] api/v1/task/create
module.exports.createPost = async (req, res) => {
  try {
    const task = new Task(req.body);
    const data = await task.save();

    res.status(200).json({
      message: "Create task success ",
    });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

// [patch] api/v1/task/edit/:id ;
module.exports.edit = async (req, res) => {
  const id = req.params.id;

  try {
    await Task.updateOne(req.body);

    res.status(202).json({
      message : "Update task success"
    })
  } catch (error) {
    res.status(500).json({ message: "error" }); 
  }
};
