import React, { Component } from 'react'
import { Form, Input, Modal, message, Select } from 'antd'

import API from '../../../apis'

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
      addUserData: null
    }
  }

  getAddAwardPunishmentPeople = () => {
    API.getAddAwardPunishmentPeople()
      .then(res => {
        this.setState({
          addUserData: res.data.data
        })
      })
      .catch(err => {
        message.error('获取失败!')
      })
  }

  addAwardPunishment = values => {
    API.addAwardPunishment({
      ...values
    })
      .then(res => {
        message.success(res.data.data.msg || '新增成功')
        this.setState(
          {
            visible: false
          },
          () => {
            this.props.form.resetFields()
          }
        )
      })
      .catch(err => {
        message.error('新增失败!')
      })
  }

  receiver = () => {
    this.setState(
      {
        visible: true
      },
      () => {
        this.getAddAwardPunishmentPeople()
      }
    )
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
      this.addAwardPunishment(values)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { addUserData } = this.state
    const { allDepartment } = this.props
    return (
      <div>
        <Modal title='新增' visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form {...formItemLayout}>
            <Form.Item label='用户'>
              {getFieldDecorator('user_id', {
                rules: [{ required: true, message: '请选择用户' }]
              })(
                <Select
                  allowClear
                  // onChange={this.queryStatusChange}
                  placeholder='请选择用户'
                  style={{ borderRadius: 4 }}>
                  {addUserData &&
                    addUserData.map((item, i) => {
                      return (
                        <Select.Option value={item.user_id} key={item.user_id + i}>
                          {item.englishName + '_' + (item.chineseName ? item.chineseName : '')}
                        </Select.Option>
                      )
                    })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label='奖励信息'>{getFieldDecorator('award', {})(<Input.TextArea />)}</Form.Item>
            <Form.Item label='惩罚信息'>{getFieldDecorator('punishment', {})(<Input.TextArea />)}</Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(PageModal)
