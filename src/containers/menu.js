const menu = [
  {
    key: '/index',
    title: '首页',
    icon: 'home',
    auth: [1]
  },
  // {
  //   title: '通用',
  //   key: '/public',
  //   icon: 'appstore',
  //   auth: [1],
  //   subs: [
  //     { title: '按钮', key: '/public/button', icon: '', auth: [1] },
  //     { title: '图标', key: '/public/icon', icon: '' }
  //   ]
  // },
  {
    title: '信息管理',
    key: '/peopleInfos',
    icon: 'team',
    auth: [1],
    subs: [
      // { title: '信息可视化', key: '/peopleInfos/visual', icon: '', auth: [1] },
      { title: '员工信息库', key: '/peopleInfos/library', icon: '', auth: [1] },
      { title: '新员工信息录入', key: '/peopleInfos/typeIn', icon: '' },
      { title: '员工迁出', key: '/peopleInfos/emigration', icon: '' }
    ]
  },
  {
    title: '职位管理',
    key: '/peopleJobs',
    icon: 'gateway',
    auth: [1],
    subs: [
      { title: '人员职位信息', key: '/peopleJobs/infos', icon: '', auth: [1] },
      { title: '部门信息', key: '/peopleJobs/change', icon: '' }
    ]
  },
  {
    title: '薪资管理',
    key: '/pay',
    icon: 'red-envelope',
    auth: [1],
    subs: [
      { title: '个人薪资信息', key: '/pay/personInfos', icon: '', auth: [1] },
      { title: '员工薪资信息', key: '/pay/staffInfos', icon: '' }
    ]
  },
  {
    title: '奖惩管理',
    key: '/awardPunishment',
    icon: 'reconciliation',
    auth: [1],
    subs: [
      { title: '个人奖惩信息', key: '/awardPunishment/query', icon: '', auth: [1] },
      { title: '奖惩信息变更', key: '/awardPunishment/update', icon: '' }
    ]
  },
  // {
  //   title: '录入与迁出',
  //   key: '/enterOut',
  //   icon: 'appstore',
  //   subs: [
  //     { title: '新员工信息录入', key: '/enterOut/typeIn', icon: '' },
  //     { title: '员工迁出', key: '/enterOut/emigration', icon: '' },
  //   ]
  // },
  {
    title: '权限管理',
    key: '/authority',
    icon: 'setting',
    subs: [{ title: '角色管理', key: '/authority/role', icon: '' }]
  }
  // {
  //     title: '导航',
  //     key: '/nav',
  //     icon: 'bulb',
  //     subs: [
  //         { title: '下拉菜单', key: '/nav/dropdown', icon: '' },
  //         { title: '导航菜单', key: '/nav/menu', icon: '' },
  //         { title: '步骤条', key: '/nav/steps', icon: '' }
  //     ]
  // },
  // {
  //     title: '表单',
  //     key: '/form',
  //     icon: 'form',
  //     subs: [
  //         { title: '基础表单', key: '/form/base-form', icon: '' },
  //         { title: '步骤表单', key: '/form/step-form', icon: '' }
  //     ]
  // },
  // {
  //     title: '展示',
  //     key: '/show',
  //     icon: 'pie-chart',
  //     subs: [
  //         { title: '表格', key: '/show/table', icon: '' },
  //         { title: '折叠面板', key: '/show/collapse', icon: '' },
  //         { title: '树形控件', key: '/show/tree', icon: '' },
  //         { title: '标签页', key: '/show/tabs', icon: '' }
  //     ]
  // },
  // {
  //     title: '其它',
  //     key: '/others',
  //     icon: 'paper-clip',
  //     auth: [1],
  //     subs: [
  //         { title: '进度条', key: '/others/progress', icon: '' },
  //         { title: '动画', key: '/others/animation', icon: '' },
  //         { title: '上传', key: '/others/upload', icon: '' },
  //         { title: '富文本', key: '/others/editor', icon: '' },
  //         { title: '404', key: '/404', icon: '' },
  //         { title: '500', key: '/500', icon: '' }
  //     ]
  // },
  // {
  //     title: '多级导航',
  //     key: '/one',
  //     icon: 'bars',
  //     subs: [
  //         {
  //             title: '二级',
  //             key: '/one/two',
  //             icon: '',
  //             subs: [{ title: '三级', key: '/one/two/three', icon: '' }]
  //         }
  //     ]
  // },
  // {
  //     title: '关于',
  //     key: '/about',
  //     icon: 'user',
  //     auth: [1]
  // }
]

export default menu
