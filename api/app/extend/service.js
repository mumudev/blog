'use strict';
module.exports = app => {
  class ServiceBase extends app.Service {
    constructor(...args) {
      super(...args);
    }
    setModel(modelName) {
      this.modelObj = modelName;
    }
    get model() {
      if (typeof (this.modelObj) === 'object') {
        return this.ctx.model[this.modelObj[0]][this.modelObj[1]];
      } else {
        return this.ctx.model[this.modelObj];
      }
    }
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
    destroyBySchoolId(id) {
      return this.model.remove({ school: id });
    }
    destroyByClassId(id) {
      return this.model.remove({ class: id });
    }
    destroyByCompanyId(id) {
      return this.model.remove({ company: id });
    }
  }
  return ServiceBase;
};
