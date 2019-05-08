export const user = {
  account: 'zyp',
  password: '111111'
}
//船号
export const shipCodes = [
  '宣城货3690', '江海通278', '宣城货3469', '鸿达3468'
]

//收货单位
export const receivingCompany = [
  '江边', '繁昌金鹰', '南方水泥厂','华阳水泥厂',
]

//规格
export const ronOreSpecifications = [
  {
    value: '0',
    label: '块矿'
  },
  {
    value: '1',
    label: '精矿'
  },
  {
    value: '2',
    label: '粉矿'
  }
];

//矿石种类/规格
export const oreTypeAndSpecifications = [
  {
    label: '白云石',
    value: '白云石',
    children: [
      {
        label: '云粉',
        value: '云粉',
      },
      {
        label: '云片',
        value: '云片',
      }
    ]
  },
  {
    label: '石灰石',
    value: '石灰石',
    children: [
      {
        label: '混合料',
        value: '混合料',
      },
      {
        label: '寸子',
        value: '寸子',
      },
      {
        label: '分子',
        value: '分子',
      }
    ]
  },
  {
    label: '铁矿石',
    value: '铁矿石',
    children: [
      {
        label: '块矿',
        value: '块矿',
      },
      {
        label: '精矿',
        value: '精矿',
      },
      {
        label: '粉矿',
        value: '粉矿',
      }
    ]
  }
];

//运输方式
export const transportationType = [
  {
    value: '0',
    label: '上船'
  },
  {
    value: '1',
    label: '自提'
  },
  {
    value: '2',
    label: '到厂'
  }
];

//班次
export const schedules = [
  {
    id: '0',
    value: '早班'
  },
  {
    id: '1',
    value: '中班'
  },
  {
    id: '2',
    value: '晚班'
  }
];
