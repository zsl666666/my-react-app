/*
 * @Author: zhoushanlin
 */
import { getRequestsByRoot } from '@/network/index.js'
// import srcConfig from 'src/config'

const { get, post } = getRequestsByRoot({ root: 'http://localhost:8001/' })
class Apis {
  /**
   * 获取所有用户角色信息
   */
  getAllPeopleList = get('/users/authority/role/query')

  /**
   * 修改角色
   */
  updateRole = post('/users/authority/role/update')
}

export default new Apis()
