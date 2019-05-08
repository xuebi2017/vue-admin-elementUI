export default {
  entity: null,
  children: [
    {
      entity: {
        id: '1',
        parentId: '0',
        name: '首页',
        icon: 'tck iconfont icon-home',
        route: '/',
        discription: '用于展示dashboard的菜单',
        createUserId: 1
      },
      children: null
    },
    {
      entity: {
        id: '2',
        parentId: '0',
        name: '老虎垅磅房',
        icon: 'tck iconfont icon-lhlpf',
        route: '',
        discription: '用于老虎垅磅房管理的菜单',
        createUserId: 1,
        can: 'view 老虎垅磅房数据'
      },
      children: [
        {
          entity: {
            id: '2-1',
            parentId: '2',
            name: '发货状态管理',
            icon: 'tck iconfont icon-lhlpf',
            route: '/weighManage/deliveryStates',
            discription: '用于发货状态管理的菜单',
            createUserId: 1,
            can: 'view 老虎垅磅房数据'
          },
          children: null
        },
        {
          entity: {
            id: '2-2',
            parentId: '2',
            name: '过磅数据管理',
            icon: 'tck iconfont icon-lhlpf',
            route: '/weighManage/weighQuery',
            discription: '用于过磅数据管理的菜单',
            createUserId: 1,
            can: 'view 老虎垅磅房数据'
          },
          children: null
        }
      ]
    },
    {
      entity: {
        id: '3',
        parentId: '0',
        name: '荻港码头',
        icon: 'tck iconfont icon-tcmt',
        route: '',
        discription: '用于荻港码头管理的菜单',
        createUserId: 1,
        can: 'view 荻港码头数据'
      },
      children: [
        {
          entity: {
            id: '3-1',
            parentId: '3',
            name: '铁运数据管理',
            icon: 'tck iconfont icon-tcmt',
            route: '/taochongWharf/railwayManage',
            discription: '用于铁运数据管理的菜单',
            createUserId: 1,
            can: 'view 荻港码头数据'
          },
          children: null
        },
        // {
        //   entity: {
        //     id: '3-2',
        //     parentId: '3',
        //     name: '船舶动态数据',
        //     icon: 'tck iconfont icon-tcmt',
        //     route: '/taochongWharf/shippingData',
        //     discription: '用于船舶动态表信息展示的菜单',
        //     createUserId: 1,
        //     can: 'view 荻港码头数据'
        //   },
        //   children: null
        // }
      ]
    },
    {
      entity: {
        id: '4',
        parentId: '0',
        name: '销售中心',
        icon: 'tck iconfont icon-xszx',
        route: '',
        discription: '用于销售计划管理的菜单',
        createUserId: 1,
        can: 'view 桃冲矿销售数据'
      },
      children: [
        {
          entity: {
            id: '4-1',
            parentId: '4',
            name: '运输计划管理',
            icon: 'tck iconfont icon-xszx',
            route: '/salesPlan/salesPlanManage',
            discription: '用于运输计划管理的菜单',
            createUserId: 1,
            can: 'view 桃冲矿销售数据'
          },
          children: null
        },
      ]
    },
    {
      entity: {
        id: '5',
        parentId: '0',
        name: '调度中心',
        icon: 'tck iconfont icon-ddzx',
        route: '',
        discription: '用于调度中心管理的菜单',
        createUserId: 1,
        can: 'view 桃冲矿调度数据'
      },
      children: [
        {
          entity: {
            id: '5-1',
            parentId: '4',
            name: '调度信息管理',
            icon: 'tck iconfont icon-ddzx',
            route: '/controlCenter/controlDisplay',
            discription: '用于展示调度信息的菜单',
            createUserId: 1,
            can: 'view 桃冲矿调度数据'
          },
          children: null
        },
      ]
    },
  ]
}
