// import loadable from '@/utils/loadable'
import { lazy } from 'react'

const Index = lazy(() => import('@/views/Index'))

// 通用
// const ButtonView = lazy(() => import('@/views/PublicView/Button'))
// const IconView = lazy(() => import('@/views/PublicView/Icon'))

// 员工信息管理
const Visual = lazy(() => import('@/views/PeopleInfos/Visual'))
const Library = lazy(() => import('@/views/PeopleInfos/Library'))

const routes = [
  { path: '/index', exact: true, name: 'Index', component: Index, auth: [1] },
  // { path: '/public/button', exact: false, name: '按钮', component: ButtonView, auth: [1] },
  // { path: '/public/icon', exact: false, name: '图标', component: IconView, auth: [1] },
  { path: '/peopleInfos/visual', exact: false, name: '信息可视化', component: Visual },
  { path: '/peopleInfos/library', exact: false, name: '员工信息库', component: Library }
]

export default routes
