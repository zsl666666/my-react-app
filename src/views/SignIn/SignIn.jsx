import React, { Component } from 'react'
import { Layout, Input, Icon, Form, Button, Divider, message } from 'antd'
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

  GoSignIn = (name, password) => {
    API.GoSignIn({
      name,
      password
    })
      .then(res => {
        this.setState({
          loading: false
        })
        message.success(res.data.msg)
        this.props.history.replace('/login')
      })
      .catch(err => {
        message.error(`${name}该用户已经被注册，请前去登录~`)
        this.setState({
          loading: false
        })
      })
  }

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
          this.GoSignIn(values.name, values.password)
        }
      )
    })
  }

  handleLogin = () => {
    this.props.history.replace('/login')
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Layout className='login animated fadeIn'>
        <div className='model'>
          <div className='login-form'>
            <h3 style={{ fontWeight: 600, fontSize: 24 }}>员工信息管理系统--注册</h3>
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
                  注册
                </Button>
                <span className='login-go-signin' onClick={this.handleLogin}>
                  已有账号，去登录~
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
