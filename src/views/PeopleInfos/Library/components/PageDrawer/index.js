import React, { Component } from 'react'
import { Form, Input, Drawer, Button } from 'antd'
import './index.scss'

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 16
  }
}

class PageDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      detailData: {}
    }
  }

  receiver = data => {
    this.setState({
      visible: true,
      detailData: data
    })
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {
      detailData: {
        englishName,
        chineseName,
        sex,
        email,
        station,
        education,
        graduate,
        birth,
        createAt,
        phone,
        address
      }
    } = this.state
    return (
      <div>
        <Drawer
          title={`${englishName} 信息详情`}
          placement='right'
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          width={400}>
          <Form
            {...formItemLayout}
            style={{
              marginBottom: '60px'
            }}>
            <Form.Item label='英文名'>
              {getFieldDecorator('englishName', {
                initialValue: englishName
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label='中文名'>
              {getFieldDecorator('chineseName', {
                initialValue: chineseName
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label='性别'>
              {getFieldDecorator('sex', {
                initialValue: sex
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label='Email'>
              {getFieldDecorator('email', {
                initialValue: email
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label='工位'>
              {getFieldDecorator('station', {
                initialValue: station
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label='学历'>
              {getFieldDecorator('education', {
                initialValue: education
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label='毕业院校'>
              {getFieldDecorator('graduate', {
                initialValue: graduate
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label='出生年月'>
              {getFieldDecorator('birth', {
                initialValue: birth
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label='入职时间'>
              {getFieldDecorator('createAt', {
                initialValue: new Date(createAt).format('yyyy-MM-dd hh:mm:ss')
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label='联系电话'>
              {getFieldDecorator('phone', {
                initialValue: phone
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label='通讯地址'>
              {getFieldDecorator('address', {
                initialValue: address
              })(<Input disabled />)}
            </Form.Item>
          </Form>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              zIndex: 2,
              borderRadius: '0 0 4px 4px'
            }}>
            <Button
              type='primary'
              style={{
                marginRight: 8
              }}
              onClick={this.onClose}>
              取消
            </Button>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default Form.create()(PageDrawer)
