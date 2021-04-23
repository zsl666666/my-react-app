/*
 * @Author: zhoushanlin
 */
import { getRequestsByRoot } from '@/network/index.js'
// import srcConfig from 'src/config'

const { post } = getRequestsByRoot({ root: 'http://localhost:8001/' })
class Apis {
  /**
   * 登录接口
   */
  GoLogin = post('/login')
}

export default new Apis()
