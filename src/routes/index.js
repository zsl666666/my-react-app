// import loadable from '@/utils/loadable'
import { lazy } from 'react'

const Index = lazy(() => import('@/views/Index'))

// 通用
const ButtonView = lazy(() => import('@/views/PublicView/Button'))
const IconView = lazy(() => import('@/views/PublicView/Icon'))

// 员工信息管理
const Visual = lazy(() => import('@/views/PeopleInfos/Visual'))
const Library = lazy(() => import('@/views/PeopleInfos/Library'))

// 职位管理
const JobInfos = lazy(() => import('@/views/PeopleJob/JobInfos'))
const JobChange = lazy(() => import('@/views/PeopleJob/JobChange'))

// 薪资信息
const PayInfos = lazy(() => import('@/views/Pay/PayInfos'))
const PayOwn = lazy(() => import('@/views/Pay/PayOwn'))

// 奖惩管理
const OwnAwardPunishment = lazy(() => import('@/views/AwardPunishment/Own'))
const ChangeAwardPunishment = lazy(() => import('@/views/AwardPunishment/Change'))

// 录入与迁出
const Role = lazy(() => import('@/views/Authority/Role'))

// 权限管理
const TypeIn = lazy(() => import('@/views/enterOut/TypeIn'))
const Emigration = lazy(() => import('@/views/enterOut/Emigration'))

const routes = [
  { path: '/index', exact: true, name: 'Index', component: Index, auth: [1] },
  { path: '/public/button', exact: false, name: '按钮', component: ButtonView, auth: [1] },
  { path: '/public/icon', exact: false, name: '图标', component: IconView, auth: [1] },
  { path: '/peopleInfos/visual', exact: false, name: '信息可视化', component: Visual },
  { path: '/peopleInfos/library', exact: false, name: '员工信息库', component: Library },
  { path: '/peopleJobs/infos', exact: false, name: '人员职位信息', component: JobInfos },
  { path: '/peopleJobs/change', exact: false, name: '职位变更', component: JobChange },
  { path: '/pay/staffInfos', exact: false, name: '员工薪资信息', component: PayInfos },
  { path: '/pay/personInfos', exact: false, name: '个人薪资信息', component: PayOwn },
  { path: '/awardPunishment/query', exact: false, name: '个人奖惩信息', component: OwnAwardPunishment },
  { path: '/awardPunishment/update', exact: false, name: '奖惩信息变更', component: ChangeAwardPunishment },
  { path: '/authority/role', exact: false, name: '角色管理', component: Role },
  { path: '/peopleInfos/typeIn', exact: false, name: '新员工信息录入', component: TypeIn },
  { path: '/peopleInfos/emigration', exact: false, name: '员工迁出', component: Emigration }
]

export default routes
