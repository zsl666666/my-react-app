import React, { PureComponent } from 'react'
import { Modal, Form, Input, Icon, Button, message } from 'antd'

import API from '../../../apis'

let id = 0

class PageModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.add()
  }

  // 新增部门
  addDepartment = departmentName => {
    API.addDepartment({
      departmentName
    })
      .then(res => {
        message.success(res.data.data.msg)
        this.handleCancel()
      })
      .catch(err => {
        message.error(err.data.msg || err.data.data.msg)
      })
  }

  handleCancel = () => {
    this.props.handleCancel()
  }

  remove = k => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    if (keys.length === 1) {
      return
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    })
  }

  add = () => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(id++)
    form.setFieldsValue({
      keys: nextKeys
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error('必填项不能为空')
        return
      }
      const { keys, names } = values
      this.addDepartment(keys.map(key => names[key]))
    })
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { visible } = this.props
    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      }
    }
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        span: 16,
        offset: 8
      }
    }
    getFieldDecorator('keys', { initialValue: [] })
    const keys = getFieldValue('keys')
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '部门名称' : ''}
        required={false}
        key={k}>
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: '请填写部门名称'
            }
          ]
        })(<Input placeholder='请输入部门名称' style={{ width: '60%', marginRight: 8 }} />)}
        {keys.length > 1 ? (
          <Icon className='dynamic-delete-button' type='minus-circle-o' onClick={() => this.remove(k)} />
        ) : null}
      </Form.Item>
    ))
    return (
      <div>
        <Modal title='新增部门' visible={visible} onOk={this.handleSubmit} onCancel={this.handleCancel}>
          <Form>
            {formItems}
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button type='dashed' onClick={this.add} style={{ width: '60%' }}>
                <Icon type='plus' /> Add field
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(PageModal)
