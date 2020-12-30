/*
 * @Author: your name
 * @Date: 2020-03-18 18:25:46
 * @LastEditTime: 2020-04-15 15:18:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /family.inkept.cn/src/pages/Order/apis.js
 */
import { getRequestsByRoot } from './index'
// import srcConfig from 'src/config'

const { get } = getRequestsByRoot({ root: 'https://img-home.csdnimg.cn/' })
class Apis {
    /**
     * 获取订餐时间 https://img-home.csdnimg.cn/data_json/toolbar/toolbar1217.json
     */
    getDingTime = get('data_json/toolbar/toolbar1217.json', {}, { autoLoading: false })
}

export default new Apis()
