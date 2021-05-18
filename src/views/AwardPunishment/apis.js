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
  getUser = get('/people/infos/list')

  /**
   * 获取个人奖惩信息
   */
  getAwardPunishment = get('/awardPunishment/query')

  /**
   * 获取将要新增奖惩的用户
   */
  getAddAwardPunishmentPeople = get('/awardPunishment/addPeople')

  /**
   * 更新奖惩信息
   */
  updateAwardPunishment = post('/awardPunishment/update')

  /**
   * 新增奖惩信息
   */
  addAwardPunishment = post('/awardPunishment/add')

  /**
   * 新增奖惩信息
   */
  deleteAwardPunishment = get('/awardPunishment/delete')
}

export default new Apis()
