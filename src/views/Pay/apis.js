/*
 * @Author: zhoushanlin
 */
import { getRequestsByRoot } from '@/network/index.js'
// import srcConfig from 'src/config'

const { get, post } = getRequestsByRoot({ root: 'http://localhost:8001/' })
class Apis {
  /**
   * 获取个人薪资信息
   */
  getPersonPayInfos = get('/pay/query')

  /**
   * 获取用户
   */
  getUser = get('/people/infos/list')

  /**
   * 修改薪资信息
   */
  updatePay = post('/pay/update')
}

export default new Apis()
