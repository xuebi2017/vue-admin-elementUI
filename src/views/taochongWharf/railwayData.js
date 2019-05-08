var Mock = require('mockjs');

//班次
const schedules = [
  {
    id: 0,
    value: '早班'
  },
  {
    id: 1,
    value: '中班'
  },
  {
    id: 2,
    value: '晚班'
  }
];

const mock = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|10': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|4-22': 1,
      'name|1': '我'
    }
  ]
});

export {
  schedules,
  mock
};
