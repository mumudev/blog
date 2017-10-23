const { app, mock, assert } = require('egg-mock/bootstrap');

describe('get()', () => {
  it('should CRUD customer success', async () => {
    const ctx = app.mockContext();
    let customer = await ctx.service.user.customer.create({
      phone: 'test',
      username: 'test',
      password: 'test',
    });
    assert(customer._id);
    assert(customer.password === 'test');
    customer = await ctx.service.user.customer.updateById(customer._id, {
      password: 'test1',
    });
    assert(customer.password === 'test1');
    customer = await ctx.service.user.customer.getById(customer._id);
    assert(customer.password === 'test1');
    customer = await ctx.service.user.customer.deleteById(customer._id);
    assert(customer.password === 'test1');
  });
  it('should login success', async () => {
    const ctx = app.mockContext();
    let customer = await ctx.service.user.customer.login({
      phone: '18666676999',
      password: 'mumu231',
    });
    assert(customer.username === '木木工程师');
  });
  it('should CRUD baby success', async () => {
    const ctx = app.mockContext();
    let customer = await ctx.service.user.customer.create({
      phone: 'test',
      username: 'test',
      password: 'test',
    });
    let mock_id = customer._id;
    let baby = await ctx.service.user.customer.addBaby(customer._id, {
      company: mock_id,
      school: mock_id,
      class: mock_id,
      babyname: 'testBaby',
      birthday: new Date(),
      sex: 1,
    });

    customer = await ctx.service.user.customer.deleteById(customer._id);
    assert(customer.password === 'test');
  });
});