import React, { lazy } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// import loadable from './utils/loadable'
import 'animate.css'
import './style/base.scss'
import './style/App.scss'

import Loading from './components/CustomLoading'

// 公共模块
// const DefaultLayout = loadable(() => import(/* webpackChunkName: 'default' */ './containers'))

// // 基础页面
// const View404 = loadable(() => import(/* webpackChunkName: '404' */ './views/Others/404'))
// const View500 = loadable(() => import(/* webpackChunkName: '500' */ './views/Others/500'))
// const Login = loadable(() => import(/* webpackChunkName: 'login' */ './views/Login'))
// 公共模块
const DefaultLayout = lazy(_ => import(/* webpackChunkName: 'default' */ './containers'))

// 基础页面
const View404 = lazy(_ => import(/* webpackChunkName: '404' */ './views/Others/404'))
const View500 = lazy(_ => import(/* webpackChunkName: '500' */ './views/Others/500'))
const Login = lazy(_ => import(/* webpackChunkName: 'login' */ './views/Login'))
const App = () => (
  <React.Suspense fallback={<Loading />}>
    <Router>
      <Switch>
        <Route path='/' exact render={() => <Redirect to='/index' />} />
        <Route path='/500' component={View500} />
        <Route path='/login' component={Login} />
        <Route path='/404' component={View404} />
        <Route component={DefaultLayout} />
      </Switch>
    </Router>
  </React.Suspense>
)

export default App
