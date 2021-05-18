/*
 * @Author: zhoushanlin
 */
import { getRequestsByRoot } from '@/network/index.js'
// import srcConfig from 'src/config'

const { get, post } = getRequestsByRoot({ root: 'http://localhost:8001/' })
class Apis {
  /**
   * 获取所有部门
   */
  getAllDepartments = get('/job/department')

  /**
   * 新增部门
   */
  addDepartment = post('/job/department/add')

  /**
   * 修改部门
   */
  renewalDepartment = get('/job/department/renewal')

  /**
   * 删除部门
   */
  deleteDepartment = get('/job/department/delete')

  /**
   * 获取各部门人员信息
   */
  getAllJobInfos = get('/job/department/detail')

  /**
   * 更新部门人员信息
   */
  updateJobPeopleInfos = post('/job/department/update')
}

export default new Apis()
