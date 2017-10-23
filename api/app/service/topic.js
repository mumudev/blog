"use strict";
const ServiceExtend = require("../extend/service");
module.exports = app => {
  const ServiceBase = ServiceExtend(app);
  class Service extends ServiceBase {
    constructor(...args) {
      super(...args);
      this.setModel("Topic");
    }
    async getAll(query = {}) {
      query.status =
        query.status === undefined || query.status === "" ? true : query.status;
      let { limit = 10, page = 1 } = query;
      page = Number.parseInt(page);
      limit = Number.parseInt(limit);
      delete query.page;
      delete query.limit;
      const models = await this.model.paginate(query, {
        select: { title: 1, view_count: 1, comment_count: 1, like_count: 1, owner: 1, tab: 1, updatedAt: 1, createdAt: 1 },
        populate: [
          { path: "owner", select: "username  head_image_url" },
        ],
        sort: { createdAt: -1 },
        page,
        limit,
      });
      return models;
    }

    async getById(id) {
      await this.updateById(id, { $inc: { view_count: 1 } });
      const topic = await this.model.findById(id).populate([
        { path: "owner", select: "username  head_image_url" },
      ]);
      const topic_id = topic._id;
      const comments = await this.ctx.model.Comment.find({ topic_id }, { topic_id: 0 }).populate([
        { path: "owner", select: "username  head_image_url" },
      ]);
      topic.comment = comments;
      return topic;
    }
  }
  return Service;
};
