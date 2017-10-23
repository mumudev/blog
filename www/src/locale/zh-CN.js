import cnLocale from 'iview/dist/locale/zh-CN';
import _ from 'lodash';

export default _.defaultsDeep({
  menu: {
    home: '首页',

    organizationManage: '组织管理',
    userManage: '用户管理',

    company: '公司',
    school: '幼儿园',
    class: '班级',
    baby: '小孩',

    ctxManage: '内容管理',
    classAlbum: '班级相册',
    classCourse: '班级课程',
    classDiet: '班级饮食',

    customer: '用户',
    manager: '管理',

    userInfo: '用户信息',
  },
  message: {
    welcome: '欢迎您',
  },

  button: {
    login: '登录',
    logout: '退出',
    refresh: '刷新',
    add: '增加',
    delete: '删除',
    edit: '修改',
    setting: '设置',
    self: '个人中心',
    show: '查看',
  },
  should: {
    select_row: '请选择一行数据！',
  },
  author: '木木工作室',
}, cnLocale);
