'use strict';
const mongoosePaginate = require('mongoose-paginate');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = new mongoose.Schema(
    {
      phone: { type: String },
      motto: { type: String },
      username: { type: String, unique: true },
      password: { type: String },
      head_image_url: { type: String },
      bot_data: { type: String },
      status: { type: Boolean, default: true },
    },
    { timestamps: true }
  );
  Schema.plugin(mongoosePaginate);
  return mongoose.model('user', Schema);
};
