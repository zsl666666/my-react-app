import React, { Component } from 'react'
import { Form, Input, Modal, message, Select } from 'antd'
import API from '../../../apis'
import { getUserInfos } from '@/utils/user'

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
      detailData: {},
      addUserData: [
        {
          auth: 1,
          value: '普通用户'
        },
        {
          auth: 2,
          value: '管理员'
        },
        {
          auth: 3,
          value: '超级管理员'
        }
      ]
    }
  }

  receiver = data => {
    console.log('接受信息', data)
    this.setState({
      visible: true,
      detailData: data
    })
  }

  updateRole = auth => {
    API.updateRole({
      auth,
      user_id: this.state.detailData.user_id
    })
      .then(res => {
        message.success(res.data.data.msg)
        this.setState({
          visible: false
        })
        this.props.getAllPeopleList()
        const userObj = getUserInfos('user') ? getUserInfos('user') : {}
        if (this.state.detailData.user_id === userObj.id) {
          userObj.auth = auth
          localStorage.clear()
          localStorage.setItem('user', JSON.stringify(userObj))
        }
        console.log('来来来来来', getUserInfos('user'))
      })
      .catch(err => {
        message.error('修改失败!')
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
      this.updateRole(values.auth)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {
      detailData: { englishName, chineseName, station, auth },
      addUserData
    } = this.state
    return (
      <div>
        <Modal title='编辑' visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form {...formItemLayout}>
            <Form.Item label='英文名'>
              {getFieldDecorator('englishName', {
                initialValue: englishName
                // rules: [
                //   { required: true, message: '请输入 英文名' }
                // ]
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label='中文名'>
              {getFieldDecorator('chineseName', {
                initialValue: chineseName
                // rules: [
                //   { required: true, message: '请输入 中文名' }
                // ]
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label='工位'>
              {getFieldDecorator('station', {
                initialValue: station
                // rules: [
                //   { required: true, message: '请输入 工位' }
                // ]
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label='角色'>
              {getFieldDecorator('auth', {
                initialValue: auth,
                rules: [{ required: true, message: '请输入 工位' }]
              })(
                <Select placeholder='请选择用户' style={{ borderRadius: 4 }}>
                  {addUserData &&
                    addUserData.map((item, i) => {
                      return (
                        <Select.Option value={item.auth} key={i}>
                          {item.value}
                        </Select.Option>
                      )
                    })}
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(PageModal)
