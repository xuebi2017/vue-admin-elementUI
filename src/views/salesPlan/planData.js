const planData = [
  {
    date: '2016-05-03',
    planCode: '0001',
    oreType: '石灰石',
    cargoSpecification: '混合料',
    receivingCompany: '江边',
    shippingAmount: '1000',
    transportationType: '自提',
    shipCode: ''
  },
  {
    date: '2016-05-03',
    planCode: '0002',
    oreType: '铁矿石',
    cargoSpecification: '粉矿',
    receivingCompany: '',
    shippingAmount: '1000',
    transportationType: '上船',
    shipCode: '宣城货3690'
  }
];

//规格
const specifications = [
  {
    id: 0,
    value: '块矿'
  },
  {
    id: 1,
    value: '精矿粉'
  },
  {
    id: 2,
    value: '粉矿'
  }
];

//船号
const shippingNum = [
  {
    id: 0,
    value: '宣城货3690'
  },
  {
    id: 1,
    value: '江海通278'
  },
  {
    id: 2,
    value: '宣城货3469'
  },
  {
    id: 3,
    value: '鸿达3468'
  }
];

//运输方式
const transportationType = [
  {
    value: '选项1',
    label: '上船'
  },
  {
    value: '选项2',
    label: '自提'
  },
  {
    value: '选项3',
    label: '到厂'
  }
];

const options = [
  {
    value: '白云石',
    label: '白云石',
    children: [
      {
        value: '云粉',
        label: '云粉'
      },
      {
        value: '云片',
        label: '云片'
      }
    ]
  },
  {
    value: '石灰石',
    label: '石灰石',
    children: [
      {
        value: '混合料',
        label: '混合料'
      },
      {
        value: '寸子',
        label: '寸子'
      },
      {
        value: '分子',
        label: '分子'
      }
    ]
  },
  {
    value: '铁矿石',
    label: '铁矿石',
    children: [
      {
        value: '块矿',
        label: '块矿'
      },
      {
        value: '精矿',
        label: '精矿'
      },
      {
        value: '粉矿',
        label: '粉矿'
      }
    ]
  }
];

export {
  planData,
  shippingNum,
  specifications,
  transportationType,
  options,
};
