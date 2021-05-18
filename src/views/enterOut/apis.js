/*
 * @Author: zhoushanlin
 */
import { getRequestsByRoot } from '@/network/index.js'
// import srcConfig from 'src/config'

const { get, post } = getRequestsByRoot({ root: 'http://localhost:8001/' })
class Apis {
  /**
   * 获取用户
   */
  getAllPeopleList = get('/type/emigration/query')

  /**
   * 获取所有部门
   */
  getAllDepartments = get('/job/department')

  /**
   * 录入信息
   */
  InputInfos = post('/type/emigration/input/infos')

  /**
   * 删除员工所有信息
   */
  deleteAllInfos = get('/type/emigration/delete/all')
}

export default new Apis()
