'use strict';
const mongoosePaginate = require('mongoose-paginate');

module.exports = app => {
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const Schema = new mongoose.Schema(
    {
      phone: { type: String },
      motto: { type: String },
      username: { type: String, unique: true },
      password: { type: String },
      head_image_url: { type: String },
      status: { type: Boolean, default: true },
    },
    { timestamps: true }
  );
  Schema.plugin(mongoosePaginate);
  return mongoose.model('user', Schema);
};
