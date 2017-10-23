'use strict';

const owners = [
  null,
  'class',
  'school',
  'company',
];
const defaultMsg = {
  '0': 'No permissions!',
  '-1': 'Login required!',
  '-2': 'Server error!',
};
module.exports = {
  done(data) {
    this.body = { code: 1, data };
  },
  fail(code = -2, msg) {
    msg = msg || defaultMsg[code];
    this.body = { code, msg };
  },
  get user_id() {
    return this.session.user && this.session.user._id;
  },
  get user_level() {
    return this.session.user && this.session.user.level;
  },
  setOwnOrg(query) {
    if (!this.session.user.level) {
      throw { code: 0, msg: 'no permission!' };
    }
    const org_name = owners[this.session.user.level];
    if (org_name) {
      query[org_name] = this.session.user.org_id;
    } else if (this.session.user.level < 999) {
      throw { code: 0, msg: 'you have no organization!' };
    }
  },
  checkAuth(level) {
    if (!this.session.user || this.session.user.level < level) {
      throw { code: 0, msg: 'no permission!' };
    }
  },
};
