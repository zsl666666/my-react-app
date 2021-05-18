import React, { Component } from 'react'
import { Form, Input, Modal, message, Select } from 'antd'
import API from '../../../../../apis'

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

  updateJobPeopleInfos = values => {
    API.updateJobPeopleInfos({
      ...values,
      user_id: this.state.detailData.user_id
    })
      .then(res => {
        console.log('更新信息', res)
        message.success('更新成功')
        this.props.getAllPeopleList()
        this.setState(
          {
            visible: false
          },
          () => {
            this.forceUpdate()
          }
        )
      })
      .catch(err => {
        console.log(err)
      })
  }

  receiver = data => {
    console.log('kokkkk', data)
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
      const obj = {
        department_id: values.department_id,
        describeJob: values.describeJob,
        specificJob: values.specificJob
      }
      this.updateJobPeopleInfos(obj)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {
      detailData: { department_id, people_infos, job_infos }
    } = this.state
    const { allDepartment } = this.props
    return (
      <div>
        <Modal title='编辑' visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form {...formItemLayout}>
            <Form.Item label='部门'>
              {getFieldDecorator('department_id', {
                initialValue: department_id,
                rules: [{ required: true, message: '请输入 部门' }]
              })(
                <Select
                  // onChange={this.queryStatusChange}
                  placeholder='选择部门'
                  style={{ borderRadius: 4 }}>
                  {allDepartment &&
                    allDepartment.map((item, i) => {
                      return (
                        <Select.Option value={item.id} key={item.id + i}>
                          {item.departmentName}
                        </Select.Option>
                      )
                    })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label='英文名'>
              {getFieldDecorator('englishName', {
                initialValue: people_infos ? people_infos.englishName : null,
                rules: [
                  // { required: true, message: '请输入 英文名' }
                ]
              })(<Input disabled allowClear />)}
            </Form.Item>
            <Form.Item label='中文名'>
              {getFieldDecorator('chineseName', {
                initialValue: people_infos ? people_infos.chineseName : null,
                rules: [
                  // { required: true, message: '请输入 中文名' }
                ]
              })(<Input disabled allowClear />)}
            </Form.Item>
            <Form.Item label='性别'>
              {getFieldDecorator('sex', {
                initialValue: people_infos ? people_infos.sex : null,
                rules: [
                  // { required: true, message: '请输入 性别' }
                ]
              })(<Input disabled allowClear />)}
            </Form.Item>
            <Form.Item label='Email'>
              {getFieldDecorator('email', {
                initialValue: people_infos ? people_infos.email : null,
                rules: [
                  // { required: true, message: '请输入 Email' },
                  {
                    type: 'email',
                    message: '请输入正确邮箱地址'
                  }
                ]
              })(<Input disabled allowClear />)}
            </Form.Item>
            <Form.Item label='工位'>
              {getFieldDecorator('station', {
                initialValue: people_infos ? people_infos.station : null,
                rules: [
                  // { required: true, message: '请输入 工位' }
                ]
              })(<Input disabled allowClear />)}
            </Form.Item>
            <Form.Item label='职位名称'>
              {getFieldDecorator('specificJob', {
                initialValue: job_infos ? job_infos.specificJob : null,
                rules: [{ required: true, message: '请输入 职位名称' }]
              })(<Input allowClear />)}
            </Form.Item>
            <Form.Item label='职位描述'>
              {getFieldDecorator('describeJob', {
                initialValue: job_infos ? job_infos.describeJob : null,
                rules: [{ required: true, message: '请输入 职位描述' }]
              })(<Input.TextArea allowClear />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(PageModal)
