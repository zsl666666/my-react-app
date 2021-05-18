import React, { Component } from 'react'
import { Form, Steps, Select, Button, Modal, message, Input, Divider, InputNumber } from 'antd'
import API from '../../../apis'
import './index.scss'

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

const steps = [
  {
    title: '员工基本信息',
    content: 'First-content'
  },
  {
    title: '员工职位信息',
    content: 'Second-content'
  },
  {
    title: '员工薪资信息',
    content: 'Last-content'
  }
]

class PageModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      detailData: null,
      formSubmitData: {
        base_infos: null,
        job_infos: null,
        pay_infos: null
      },
      current: 0,
      base_pay: undefined,
      social_security: 8,
      accumulation_fund: 12,
      medical_treatment: 0.2,
      income_tax: 0,
      real_pay: undefined,
      allDepartment: null // 获取所有部门
    }
  }

  // updatePeopleInfos = (params) => {
  //   API.updatePeopleInfos({
  //     id: this.state.detailData['id'],
  //     ...params
  //   }).then(res => {
  //     message.success(res.data.msg)
  //     this.setState({
  //       visible: false,
  //     }, () => {
  //       this.props.updateOkFun()
  //       this.props.form.resetFields();
  //     })
  //   }).catch(err => {
  //     message.error('更新失败！')
  //   })
  // }
  InputInfos = formSubmitData => {
    API.InputInfos({
      ...formSubmitData,
      user_id: this.state.detailData.user_id
    })
      .then(res => {
        message.success(res.data.data.msg)
        this.setState(
          {
            visible: false
          },
          () => {
            this.props.updateOkFun()
          }
        )
      })
      .catch(err => {
        message.error('录入失败!')
      })
  }

  componentDidMount() {
    this.getAllDepartments()
  }

  //获取所有部门
  getAllDepartments = () => {
    API.getAllDepartments()
      .then(res => {
        this.setState({
          allDepartment: res.data.data || []
        })
      })
      .catch(err => {
        message.error('获取部门失败！')
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

  // 基本工资
  handleBasePay = e => {
    const income_tax = e > 5000 ? 5 : 0
    const real_pay =
      e -
      (e * (this.state.social_security + this.state.accumulation_fund + this.state.medical_treatment + income_tax)) /
        100
    this.setState({
      base_pay: e,
      real_pay: Math.round(real_pay),
      income_tax
    })
  }

  // 社保
  handleSocialSecurity = e => {
    const real_pay =
      this.state.base_pay -
      (this.state.base_pay *
        (e + this.state.accumulation_fund + this.state.medical_treatment + this.state.income_tax)) /
        100
    this.setState({
      social_security: e,
      real_pay: Math.round(real_pay)
    })
  }

  // 公积金
  handleAccumulationFund = e => {
    const real_pay =
      this.state.base_pay -
      (this.state.base_pay * (this.state.social_security + e + this.state.medical_treatment + this.state.income_tax)) /
        100
    this.setState({
      accumulation_fund: e,
      real_pay: Math.round(real_pay)
    })
  }

  // 医疗
  handleMedicalTreatment = e => {
    const real_pay =
      this.state.base_pay -
      (this.state.base_pay * (this.state.social_security + this.state.accumulation_fund + e + this.state.income_tax)) /
        100
    this.setState({
      medical_treatment: e,
      real_pay: Math.round(real_pay)
    })
  }

  // handleOk = () => {
  //   this.props.form.validateFields((err, values) => {
  //     if (err) {
  //       message.error('必填项不能为空')
  //       return
  //     }
  //     console.log('valuesbalues', values)
  //   })
  // }

  next() {
    const { current, formSubmitData } = this.state
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error('必填项不能为空')
        return
      }
      console.log('valuesbalues', values)
      if (current === 0) {
        this.setState({
          formSubmitData: {
            ...formSubmitData,
            base_infos: values
          },
          current: this.state.current + 1
        })
      } else if (current === 1) {
        this.setState({
          formSubmitData: {
            ...formSubmitData,
            job_infos: values
          },
          current: this.state.current + 1
        })
      }
      // else if (current === 2) {
      //   this.setState({
      //     formSubmitData: {
      //       ...formSubmitData,
      //       pay_infos: values,
      //     },
      //     current: this.state.current + 1
      //   })
      // }
      // const current = this.state.current + 1;
      // this.setState({ current });
    })
  }

  prev() {
    const current = this.state.current - 1
    this.setState({ current })
  }

  handleStepsValueBase = current => {
    const { getFieldDecorator } = this.props.form
    const {
      formSubmitData: { base_infos }
    } = this.state
    const resultBaseInfos = (
      <>
        <Form.Item label='中文名'>
          {getFieldDecorator('chineseName', {
            initialValue: base_infos ? base_infos.chineseName : null,
            rules: [{ required: true, message: '请输入 中文名' }]
          })(<Input allowClear />)}
        </Form.Item>
        <Form.Item label='性别'>
          {getFieldDecorator('sex', {
            initialValue: base_infos ? base_infos.sex : '男',
            rules: [{ required: true, message: '请输入 性别' }]
          })(
            <Select placeholder='选择性别' style={{ borderRadius: 4 }}>
              <Select.Option value='男'>男</Select.Option>
              <Select.Option value='女'>女</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label='Email'>
          {getFieldDecorator('email', {
            initialValue: base_infos ? base_infos.email : null,
            rules: [
              { required: true, message: '请输入 Email' },
              {
                type: 'email',
                message: '请输入正确邮箱地址'
              }
            ]
          })(<Input allowClear />)}
        </Form.Item>
        <Form.Item label='工号'>
          {getFieldDecorator('station', {
            initialValue: base_infos ? base_infos.station : null,
            rules: [{ required: true, message: '请输入 工号' }]
          })(<Input allowClear />)}
        </Form.Item>
        <Form.Item label='学历'>
          {getFieldDecorator('education', {
            initialValue: base_infos ? base_infos.education : '本科',
            rules: [{ required: true, message: '请输入 学历' }]
          })(
            <Select placeholder='选择学历' style={{ borderRadius: 4 }}>
              <Select.Option value='大专'>大专</Select.Option>
              <Select.Option value='本科'>本科</Select.Option>
              <Select.Option value='研究生'>研究生</Select.Option>
              <Select.Option value='其它'>其它</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label='毕业院校'>
          {getFieldDecorator('graduate', {
            initialValue: base_infos ? base_infos.graduate : null,
            rules: [{ required: true, message: '请输入 毕业院校' }]
          })(<Input allowClear />)}
        </Form.Item>
        <Form.Item label='出生年月'>
          {getFieldDecorator('birth', {
            initialValue: base_infos ? base_infos.birth : null,
            rules: [{ required: true, message: '请输入 出生年月' }]
          })(<Input allowClear />)}
        </Form.Item>
        <Form.Item label='手机号'>
          {getFieldDecorator('phone', {
            initialValue: base_infos ? base_infos.phone : null,
            rules: [{ required: true, pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号' }]
          })(<Input allowClear />)}
        </Form.Item>
        <Form.Item label='通讯地址'>
          {getFieldDecorator('address', {
            initialValue: base_infos ? base_infos.address : null,
            rules: [{ required: true, message: '请输入 通讯地址' }]
          })(<Input.TextArea allowClear />)}
        </Form.Item>
      </>
    )

    return resultBaseInfos
  }

  handleStepsValueJob = current => {
    const { getFieldDecorator } = this.props.form
    const {
      formSubmitData: { job_infos },
      allDepartment
    } = this.state
    const resultJobInfos = (
      <>
        <Form.Item label='所属部门'>
          {getFieldDecorator('department_id', {
            initialValue: job_infos ? job_infos.department_id : null,
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
      </>
    )
    return resultJobInfos
  }

  handleStepsValuePay = current => {
    const { getFieldDecorator } = this.props.form
    const resultPayInfos = (
      <>
        <Form.Item label='基本工资'>
          {getFieldDecorator('base_pay', {
            initialValue: this.state.base_pay,
            rules: [{ required: true, message: '请输入 基本工资' }]
          })(
            <InputNumber
              style={{
                width: 322
              }}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={this.handleBasePay}
            />
          )}
        </Form.Item>
        <Form.Item label='社保'>
          {getFieldDecorator('social_security', {
            initialValue: this.state.social_security,
            rules: [{ required: true, message: '请输入' }]
          })(
            <InputNumber
              style={{
                width: 322
              }}
              min={0}
              max={20}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              onChange={this.handleSocialSecurity}
            />
          )}
        </Form.Item>
        <Form.Item label='公积金'>
          {getFieldDecorator('accumulation_fund', {
            initialValue: this.state.accumulation_fund,
            rules: [{ required: true, message: '请输入' }]
          })(
            <InputNumber
              style={{
                width: 322
              }}
              min={0}
              max={12}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              onChange={this.handleAccumulationFund}
            />
          )}
        </Form.Item>
        <Form.Item label='医疗'>
          {getFieldDecorator('medical_treatment', {
            initialValue: this.state.medical_treatment,
            rules: [{ required: true, message: '请输入' }]
          })(
            <InputNumber
              style={{
                width: 322
              }}
              min={0}
              max={10}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              onChange={this.handleMedicalTreatment}
            />
          )}
        </Form.Item>
        <Form.Item label='个人所得税'>
          {getFieldDecorator('income_tax', {
            initialValue: this.state.income_tax,
            rules: [{ required: true, message: '请输入' }]
          })(
            <InputNumber
              disabled
              style={{
                width: 322
              }}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            />
          )}
        </Form.Item>
        <Form.Item label='实发工资'>
          {getFieldDecorator('real_pay', {
            initialValue: this.state.real_pay,
            rules: [{ required: true, message: '请输入' }]
          })(
            <InputNumber
              disabled
              style={{
                width: 322
              }}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          )}
        </Form.Item>
      </>
    )
    return resultPayInfos
  }

  handleSubmitOk = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error('必填项不能为空')
        return
      }
      values.social_security = values.social_security / 100
      values.accumulation_fund = values.accumulation_fund / 100
      values.medical_treatment = values.medical_treatment / 100
      values.income_tax = values.income_tax / 100
      this.setState(
        {
          formSubmitData: {
            ...this.state.formSubmitData,
            pay_infos: {
              base_pay: values.base_pay,
              social_security: values.social_security,
              accumulation_fund: values.accumulation_fund,
              medical_treatment: values.medical_treatment,
              income_tax: values.income_tax,
              real_pay: values.real_pay
            }
          }
        },
        () => {
          this.InputInfos(this.state.formSubmitData)
          console.log('查看提交参数', this.state.formSubmitData, this.state.detailData)
        }
      )
    })
  }

  render() {
    const { current, detailData } = this.state
    return (
      <div>
        <Modal
          title={`录入信息 ( ${detailData ? detailData.englishName : ''} ) `}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={600}
          footer={false}>
          <Steps current={current}>
            {steps.map(item => (
              <Steps.Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className='form-type-in'>
            <Form {...formItemLayout} className='form-enter'>
              {current === 0
                ? this.handleStepsValueBase(current)
                : current === 1
                ? this.handleStepsValueJob(current)
                : this.handleStepsValuePay(current)}
            </Form>
          </div>
          <Divider />
          <div className='form-type-btn'>
            {current < steps.length - 1 && (
              <Button type='primary' onClick={() => this.next()}>
                下一步
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type='primary' onClick={() => this.handleSubmitOk()}>
                确认
              </Button>
            )}
            {current > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                上一步
              </Button>
            )}
          </div>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(PageModal)
