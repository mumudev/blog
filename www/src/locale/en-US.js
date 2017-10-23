import enLocale from 'iview/dist/locale/en-US';
import _ from 'lodash';

// {{$t('menu.ctxManage')}}
// </template>
// <MenuItem name="/album" v-if="user_level>0">{{$t('menu.album')}}</MenuItem>
// <MenuItem name="/course" v-if="user_level>0">{{$t('menu.course')}}</MenuItem>
// <MenuItem name="/diet" v-if="user_level>0">{{$t('menu.diet')}}</MenuItem>
export default _.defaultsDeep({
  menu: {
    home: 'Home',
    userManage: 'User Management',
    organizationManage: 'Organization Manage',

    company: 'Company',
    school: 'School',
    class: 'Class',
    baby: 'Baby',

    customer: 'customer',
    manager: 'manager',
    teacher: 'Teacher',

    ctxManage: 'Content Management',
    classAlbum: 'Class Album',
    classCourse: 'Class Curriculum',
    classDiet: 'Class Diet',

    userInfo: 'User Info',
  },
  message: {
    welcome: 'Welcome',
  },
  button: {
    login: 'Login',
    logout: 'Logout',
    refresh: 'Refresh',
    add: 'Add',
    delete: 'Delete',
    setting: 'Setting',
    self: 'Personal Center',
    edit: 'Edit',
    show: 'Show',
  },
  author: 'mumuimp',
}, enLocale);
