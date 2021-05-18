import React, { Component } from 'react'
import { Form, Input, Modal, message } from 'antd'
import API from '../../apis'

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

class PageModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      detailData: {}
    }
  }

  updatePeopleInfos = params => {
    API.updatePeopleInfos({
      id: this.state.detailData['id'],
      ...params
    })
      .then(res => {
        message.success(res.data.msg)
        this.setState(
          {
            visible: false
          },
          () => {
            this.props.updateOkFun()
            this.props.form.resetFields()
          }
        )
      })
      .catch(err => {
        message.error('更新失败！')
      })
  }

  receiver = data => {
    this.setState({
      visible: true,
      detailData: data
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error('必填项不能为空')
        return
      }
      delete values.createAt
      this.updatePeopleInfos(values)
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
        <Modal title='编辑' visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form {...formItemLayout}>
            <Form.Item label='英文名'>
              {getFieldDecorator('englishName', {
                initialValue: englishName,
                rules: [{ required: true, message: '请输入 英文名' }]
              })(<Input disabled allowClear />)}
            </Form.Item>
            <Form.Item label='中文名'>
              {getFieldDecorator('chineseName', {
                initialValue: chineseName,
                rules: [{ required: true, message: '请输入 中文名' }]
              })(<Input allowClear />)}
            </Form.Item>
            <Form.Item label='性别'>
              {getFieldDecorator('sex', {
                initialValue: sex,
                rules: [{ required: true, message: '请输入 性别' }]
              })(<Input allowClear />)}
            </Form.Item>
            <Form.Item label='Email'>
              {getFieldDecorator('email', {
                initialValue: email,
                rules: [
                  { required: true, message: '请输入 Email' },
                  {
                    type: 'email',
                    message: '请输入正确邮箱地址'
                  }
                ]
              })(<Input allowClear />)}
            </Form.Item>
            <Form.Item label='工位'>
              {getFieldDecorator('station', {
                initialValue: station,
                rules: [{ required: true, message: '请输入 工位' }]
              })(<Input allowClear />)}
            </Form.Item>
            <Form.Item label='学历'>
              {getFieldDecorator('education', {
                initialValue: education,
                rules: [{ required: true, message: '请输入 学历' }]
              })(<Input allowClear />)}
            </Form.Item>
            <Form.Item label='毕业院校'>
              {getFieldDecorator('graduate', {
                initialValue: graduate,
                rules: [{ required: true, message: '请输入 毕业院校' }]
              })(<Input allowClear />)}
            </Form.Item>
            <Form.Item label='出生年月'>
              {getFieldDecorator('birth', {
                initialValue: birth,
                rules: [{ required: true, message: '请输入 出生年月' }]
              })(<Input allowClear />)}
            </Form.Item>
            <Form.Item label='入职时间'>
              {getFieldDecorator('createAt', {
                initialValue: new Date(createAt).format('yyyy-MM-dd hh:mm:ss'),
                rules: [{ required: true, message: '请输入 入职时间' }]
              })(<Input disabled allowClear />)}
            </Form.Item>
            <Form.Item label='手机号'>
              {getFieldDecorator('phone', {
                initialValue: phone,
                rules: [{ required: true, pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号' }]
              })(<Input allowClear />)}
            </Form.Item>
            <Form.Item label='通讯地址'>
              {getFieldDecorator('address', {
                initialValue: address,
                rules: [{ required: true, message: '请输入 通讯地址' }]
              })(<Input allowClear />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(PageModal)
