'use strict';
const mongoosePaginate = require('mongoose-paginate');

module.exports = app => {
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const Schema = new mongoose.Schema({
    owner: { type: ObjectId, required: true, ref: 'user' },
    name: { type: String },
    type: { type: String },
    size: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
  }, { timestamps: true });
  Schema.plugin(mongoosePaginate);
  return mongoose.model('file', Schema);
};
