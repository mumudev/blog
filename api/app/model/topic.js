'use strict';
const mongoosePaginate = require('mongoose-paginate');

module.exports = app => {
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const Schema = new mongoose.Schema(
    {
      owner: { type: ObjectId, required: true, ref: 'user' },
      tab: { type: String },
      title: { type: String },
      content: { type: String },
      like_count: { type: Number, default: 0 },
      view_count: { type: Number, default: 0 },
      comment_count: { type: Number, default: 0 },
      comment: [{ type: ObjectId, ref: 'comment' }],
      top: { type: Boolean, default: false },
      good: { type: Boolean, default: false },
      status: { type: Boolean, default: true },
    },
    { timestamps: true }
  );
  Schema.plugin(mongoosePaginate);
  return mongoose.model('topic', Schema);
};
