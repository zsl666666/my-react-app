import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import loading from './components/loading'
// import './network'
// 页面加载完成监听
document.addEventListener('DOMContentLoaded', e => {
  // 结束loading
  loading.hide()
})

const ENTRY_CONTAINER = document.getElementById('entry-container')
const AppView = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(AppView, ENTRY_CONTAINER)
