'use strict';

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
  checkAuth(level) {
    if (!this.session.user || this.session.user.level < level) {
      throw { code: 0, msg: 'no permission!' };
    }
  },
};
