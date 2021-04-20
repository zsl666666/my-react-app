/*
 * @Author: zhoushanlin
 */
import { getRequestsByRoot } from '@/network/index.js'
// import srcConfig from 'src/config'

const { post } = getRequestsByRoot({ root: 'http://localhost:8001/' })
class Apis {
  /**
   * 获取订餐时间 https://img-home.csdnimg.cn/data_json/toolbar/toolbar1217.json
   */
  GoSignIn = post('/users', {}, { autoLoading: false })
}

export default new Apis()
