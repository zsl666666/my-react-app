import React, { Component } from 'react'
import { Layout, Input, Icon, Form, Button, Divider, message, notification } from 'antd'
import { withRouter } from 'react-router-dom'
// import axios from '@/api'
// import { API } from '@/api/config'
import '@/style/view-style/login.scss'
import './index.scss'
import API from './apis'

class Login extends Component {
  state = {
    loading: false
  }

  enterLoading = () => {
    this.setState({
      loading: true
    })
  }

  // 登录接口
  GoLogin = (name, password) => {
    API.GoLogin({
      name,
      password
    })
      .then(res => {
        this.setState(
          {
            loading: false
          },
          () => {
            message.success('登录成功')
            localStorage.setItem('user', JSON.stringify(res))
            this.props.history.push('/')
          }
        )
      })
      .catch(err => {
        message.error('用户不存在，请先注册~')
        this.setState({
          loading: false
        })
        this.props.history.push('/signIn')
      })
  }

  // handleSubmit = () => {
  //     // e.preventDefault()
  //     this.props.form.validateFields((err, values) => {
  //         if (!err) {
  //             // let { username, password } = values
  //             // axios
  //             //     .post(`${API}/login`, { username, password })
  //             //     .then(res => {
  //             //         if (res.data.code === 0) {
  //             //             localStorage.setItem('user', JSON.stringify(res.data.data.user))
  //             //             localStorage.setItem('token', res.data.data.token)
  //             //             this.props.history.push('/')
  //             //             message.success('登录成功!')
  //             //         } else {
  //             //             // 这里处理一些错误信息
  //             //         }
  //             //     })
  //             //     .catch(err => {})

  //             // 这里可以做权限校验 模拟接口返回用户权限标识
  //             switch (values.name) {
  //                 case 'admin':
  //                     values.auth = 0
  //                     break
  //                 default:
  //                     values.auth = 1
  //             }

  //             localStorage.setItem('user', JSON.stringify(values))
  //             this.enterLoading()
  //             this.timer = setTimeout(() => {
  //                 message.success('登录成功!')
  //                 this.props.history.push('/')
  //             }, 2000)
  //         }
  //     })
  // }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error('必填项不能为空')
        return
      }
      this.setState(
        {
          loading: true
        },
        () => {
          this.GoLogin(values.name, values.password)
        }
      )
    })
  }

  // 点击进入注册页
  handleSignIn = () => {
    this.props.history.replace('/signIn')
  }

  componentDidMount() {
    notification.open({
      message: '欢迎使用该员工信息管理管理平台',
      duration: 5,
      description: '权限(超级管理员 > 管理员 > 普通用户)'
    })
    // notification.open({
    //     message: '欢迎使用后台管理平台',
    //     duration: 3,
    //     description: '账号 admin(管理员) 其他(游客) 密码随意'
    // })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Layout className='login animated fadeIn'>
        <div className='model'>
          <div className='login-form'>
            <h3 style={{ fontWeight: 600, fontSize: 24 }}>员工信息管理系统--登录</h3>
            <Divider />
            <Form>
              <Form.Item>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入用户名!' }]
                })(<Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名' />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }]
                })(
                  <Input
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type='password'
                    placeholder='密码'
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  className='login-form-button'
                  loading={this.state.loading}
                  onClick={this.handleSubmit}>
                  登录
                </Button>
                <span className='login-go-signin' onClick={this.handleSignIn}>
                  还没有账号，请先去注册~
                </span>
                {/* <Button
                                    type='primary'
                                    className='login-form-button-z'
                                    loading={this.state.loading}
                                    onClick={this.handleSignIn}
                                >
                                    注册
                                </Button> */}
              </Form.Item>
            </Form>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withRouter(Form.create()(Login))
