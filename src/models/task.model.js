const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: "initial",
    },
    content: {
      type: String,
      required: [true, "Vui lòng nhập nội dung công việc"],
    },
    user_id: {
      type: String,
      require: true,
    },
    listUser: {
      type: Array,
    },
    timeStart: {
      type: Date,
      required: [true, "Vui lòng nhập thời gian bắt đầu"],
    },
    timeFinish: {
      type: Date,
      required: [true, "Vui lòng nhập thời gian kết thúc"],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema, "tasks");
