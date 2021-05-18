/*
 * @Author: zhoushanlin
 */
import { getRequestsByRoot } from '@/network/index.js'
// import srcConfig from 'src/config'

const { get, post } = getRequestsByRoot({ root: 'http://localhost:8001/' })
class Apis {
  /**
   * 获取所有用户信息数据
   */
  getAllPeopleList = get('/people/infos/query')

  /**
   * 获取所有用户信息数据
   */
  updatePeopleInfos = post('/people/infos/update')
}

export default new Apis()
