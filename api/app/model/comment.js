'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const Schema = new mongoose.Schema(
    {
      topic_id: { type: ObjectId, required: true },
      owner: { type: ObjectId, required: true, ref: 'user' },
      likes: { type: Number, default: 0 },
      content: { type: String },
      status: { type: Boolean, default: true },
    },
    { timestamps: true }
  );
  return mongoose.model('comment', Schema);
};
