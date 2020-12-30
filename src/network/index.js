import axios from 'axios'
import axiosService from 'axios-service'
// import loading from 'components/loading'
// import $user from 'user'
// import srcConfig from 'src/config'
// import { Message } from 'antd'

// 设置 system_id 和 ticket
// const setTicketAndSystemIdToParams = config => {
//   const { params = {} } = config

//   config.params = {
//     ...params,
//     ticket: $user.getToken(),
//     system_id: srcConfig.AUTH_SYSTEM_ID,
//   }
// }

const token = localStorage.getItem('token')

// const TIME_OUT = 5000
const TIME_OUT = 3e4

// 单独走新的axios实例
const instance = axios.create()

const authAxiosService = axiosService.create()

authAxiosService.init(instance, {
    requestDefaults: {
        // 目前还没实现, 预计在下个版本中处理
        autoLoading: true,
        // response.data下面的配置
        // server端请求msg(
        msgKey: 'msg',
        // server端数据的key
        dataKey: 'data',
        // server端请求状态的key
        codeKey: 'code',
        // server端请求成功的状态, 注意: 此为response.data下该接口请求成功状态码, 非浏览器中http请求返回的成功状态(200)
        successCode: 200
    }
})

// 超时时间
instance.defaults.timeout = TIME_OUT

// 请求拦截器
// instance.interceptors.request.use(config => {
//   loading.show()

//   setTicketAndSystemIdToParams(config)

//   return config
// }, error => {
//   loading.hide()
//   console.error('加载超时')
//   return Promise.reject(error)
// })

instance.interceptors.request.use(
    config => {
        // debugger
        // console.log('token', token)
        // 将 token 添加到请求头
        token && (config.headers.Authorization = token)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
// instance.interceptors.response.use(response => {
//   // console.log('response', response)
//   loading.hide()
//   const { data = {} } = response

//   if (data.dm_error === 4000001 || data.dm_error === 4000003) {
//     $user.logout()
//   } else if (data.dm_error !== 0) {
//     Message.error(data.error_msg || '接口响应异常，请联系管理员')
//   }
//   return response
// }, error => {
//   loading.hide()
//   console.error('加载失败')
//   return Promise.reject(error)
// })

instance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        // 相应错误处理
        // 比如： token 过期， 无权限访问， 路径不存在， 服务器问题等
        switch (error.response.status) {
            case 401:
                break
            case 403:
                break
            case 404:
                break
            case 500:
                break
            default:
                console.log('其他错误信息')
        }
        return Promise.reject(error)
    }
)

export const { service, getRequestsByRoot, getMockDecoratorByEnv } = authAxiosService
