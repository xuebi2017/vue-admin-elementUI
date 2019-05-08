export const weighData = [
  {
    date: '2016-05-03',
    name: '王小虎',
    logisticsMode: '上船',
    carNum: '0001',
    cargoSpecifications: '混合料',
    receivingUnit: '江边',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    logisticsMode: '上船',
    carNum: '0002',
    cargoSpecifications: '混合料',
    receivingUnit: '江边',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    logisticsMode: '上船',
    carNum: '0003',
    cargoSpecifications: '混合料',
    receivingUnit: '江边',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-01',
    name: '刘倩',
    logisticsMode: '自提',
    carNum: '0004',
    cargoSpecifications: '灰合',
    receivingUnit: '繁昌金鹰',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-08',
    name: '刘倩',
    logisticsMode: '自提',
    carNum: '0005',
    cargoSpecifications: '灰合',
    receivingUnit: '繁昌金鹰',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-06',
    name: '刘云',
    logisticsMode: '到厂',
    carNum: '0006',
    cargoSpecifications: '分子',
    receivingUnit: '南方水泥厂',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-07',
    name: '刘云',
    logisticsMode: '到厂',
    carNum: '0007',
    cargoSpecifications: '分子',
    receivingUnit: '华阳水泥厂',
    address: '上海市普陀区金沙江路 1518 弄'
  }
]
export const deliveryStateData = [
  {
    planNum: '0001',
    deliveryStates: {
      cargoSpecifications: '混合料',
      logisticsMode: '上船',
      hasDelivered: '200',
      noDelivered: '300'
    },
    ifComplete: '0',
    cargoSpecifications: '混合料',
    receivingUnit: '江边',
  },
  {
    planNum: '0002',
    deliveryStates: {
      cargoSpecifications: '混合料',
      logisticsMode: '上船',
      hasDelivered: '600',
      noDelivered: '100'
    },
    ifComplete: '0',
    cargoSpecifications: '混合料',
    receivingUnit: '江边',
  },
  {
    planNum: '0003',
    deliveryStates: {
      cargoSpecifications: '灰合',
      logisticsMode: '自提',
      hasDelivered: '200',
      noDelivered: '300'
    },
    ifComplete: '0',
    cargoSpecifications: '灰合',
    receivingUnit: '繁昌金鹰',
  },
  {
    planNum: '0004',
    deliveryStates: {
      cargoSpecifications: '分子',
      logisticsMode: '自提',
      hasDelivered: '800',
      noDelivered: '0'
    },
    ifComplete: '1',
    cargoSpecifications: '混合料',
    receivingUnit: '南方水泥厂',
  },
  {
    planNum: '0005',
    deliveryStates: {
      cargoSpecifications: '混合料',
      logisticsMode: '到厂',
      hasDelivered: '500',
      noDelivered: '0'
    },
    ifComplete: '1',
    cargoSpecifications: '混合料',
    receivingUnit: '华阳水泥厂',
  }
]
//司磅员
export const weighingClerk = [
  {
    value: '选项1',
    label: '王小虎'
  },
  {
    value: '选项2',
    label: '刘倩'
  },
  {
    value: '选项3',
    label: '刘云'
  },
  {
    value: '选项4',
    label: '吴凤'
  },
  {
    value: '选项5',
    label: '张晗'
  }
]
//车号
export const carNum = [
  {
    value: '选项1',
    label: '0001'
  },
  {
    value: '选项2',
    label: '0002'
  },
  {
    value: '选项3',
    label: '0003'
  },
  {
    value: '选项4',
    label: '0004'
  },
  {
    value: '选项5',
    label: '0005'
  },
  {
    value: '选项6',
    label: '0006'
  },
  {
    value: '选项7',
    label: '0007'
  }
]

//计划编号
export const planNum = [
  {
    value: '选项1',
    label: '0001'
  },
  {
    value: '选项2',
    label: '0002'
  },
  {
    value: '选项3',
    label: '0003'
  },
  {
    value: '选项4',
    label: '0004'
  },
  {
    value: '选项5',
    label: '0005'
  }
]
//货物规格
export const cargoSpecifications = [
  {
    value: '选项1',
    label: '寸子'
  },
  {
    value: '选项2',
    label: '分子'
  },
  {
    value: '选项3',
    label: '混合料'
  }
]
//物流方式
export const logisticsMode = [
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
]
//收货单位
export const receivingUnit = [
  {
    value: '选项1',
    label: '江边'
  },
  {
    value: '选项2',
    label: '繁昌金鹰'
  },
  {
    value: '选项3',
    label: '南方水泥厂'
  },
  {
    value: '选项4',
    label: '华阳水泥厂'
  }
]
