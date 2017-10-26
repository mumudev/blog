'use strict';

// app/extend/application.js
module.exports = {
  get BaseService() {
    class ServiceBase extends this.Service {
      async getAll(query = {}, selected) {
        const models = await this.model.find(query, selected);
        return models;
      }
      async getById(id, selected) {
        const model = await this.model.findById(id, selected);
        return model;
      }
      async updateById(id, body) {
        delete body._id;
        const model = await this.model.findByIdAndUpdate(id, body, { new: true });
        return model;
      }
      async deleteById(id) {
        const model = await this.model.findByIdAndRemove(id);
        return model;
      }
      async create(body) {
        const model = await this.model.create(body);
        return model;
      }
      async createOnce(body) {
        let model = await this.model.findOne(body);
        if (!model) {
          model = await this.model.create(body);
        }
        return model;
      }
    }
    return ServiceBase;
  }
};
