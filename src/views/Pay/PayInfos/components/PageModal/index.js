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
      detailData: {},
      user_id: null
    }
  }

  receiver = (data, user_id) => {
    console.log('解决', data, user_id)
    this.setState({
      visible: true,
      detailData: data,
      user_id
    })
  }

  updatePay = base_pay => {
    const {
      detailData: { social_security, accumulation_fund, medical_treatment },
      user_id
    } = this.state
    API.updatePay({
      base_pay,
      user_id,
      social_security,
      accumulation_fund,
      medical_treatment
    })
      .then(res => {
        message.success(res.data.data.msg)
        this.setState(
          {
            visible: false
          },
          () => {
            this.props.handleInsertOk()
          }
        )
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
      console.log('valuelue', values)
      this.updatePay(Number(values.base_pay))
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {
      detailData: { base_pay }
    } = this.state
    const { allDepartment } = this.props
    return (
      <div>
        <Modal title='编辑' visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form {...formItemLayout}>
            <Form.Item label='基本工资'>
              {getFieldDecorator('base_pay', {
                initialValue: base_pay,
                rules: [{ required: true, message: '请输入 基本工资' }]
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(PageModal)
