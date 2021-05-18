import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import loading from './components/loading'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import '@/utils/proto-extension.js'
// import zhCN from 'antd/lib/locale-provider/zh_CN';
// import './network'
// 页面加载完成监听

import moment from 'moment'
import 'moment/locale/zh-cn'
// 设置日历语言
moment.locale('zh-cn')

document.addEventListener('DOMContentLoaded', e => {
  // 结束loading
  loading.hide()
})

const ENTRY_CONTAINER = document.getElementById('entry-container')
const AppView = (
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>
)

ReactDOM.render(AppView, ENTRY_CONTAINER)
