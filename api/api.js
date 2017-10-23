const api = {
  common: {
    response: {
      msg: String, //返回处理结果的文字信息  
      code: Number, //成功返回1，失败返回，没有权限返回-1
      responseData: {}, //返回数据
    }
  },
  /**
   * 通用接口
   * userType： admin, owner, director, teacher, parent //用户类型
   * modelName： album, baby, class, company, course, diet, info, message, notice, report, school, user //数据名称
   * modelStructure： model的数据结构，具体可以直接查看 /app/model/**.js
   */
  template: {//对应增删改查
    get: {
      url: `/${userType}/${modelName}/${_id}`, //_id不传时默认取全部
      type: "get",
      responseData: {//带_id是返回单个model，不带_id时返回数组
        ...modelStructure
      },
    },
    post: {
      url: `/${userType}/${modelName}`,
      type: "post",
      requestData: {
        ...modelStructure
      },
      responseData: {//带_id
        ...modelStructure
      },
    },
    put: {
      url: `/${userType}/${modelName}/${_id}`, //_id必传
      type: "put",
      requestData: {
        ...modelStructure
      },
    },
    delete: {
      url: `/${userType}/${modelName}/${_id}`, //_id必传
      type: "delete",
    },
  },
  /**
   * 专用接口
   */
};
