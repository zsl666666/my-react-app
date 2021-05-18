import React, { Component } from 'react'
import { Form, Select, Row, Button, message } from 'antd'
import './index.scss'
import API from '../../../apis'

const styles = {
  form: {
    marginBottom: '10px'
  },
  title: {
    display: 'inline-block',
    margin: 0,
    fontSize: '16px',
    lineHeight: '24px'
  },
  search: {
    // margin: '10px 0',
  },
  item: {
    margin: '10px'
  },
  formInput: {
    width: '200px'
  },
  btn: {
    marginLeft: '12px'
  },
  upload: {
    display: 'inline-block'
  },
  handle: {
    marginTop: '10px'
  }
}

// @Form.create()
class PageFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      englishName: '',
      chineseName: '',
      station: '',
      userData: null
    }
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = () => {
    API.getUser()
      .then(res => {
        this.setState({
          userData: res.data.data
        })
      })
      .catch(err => {
        message.error('查询失败!')
      })
  }

  /**
   * 查询参数处理
   */
  get searchParams() {
    const filterParmas = this.props.form.getFieldsValue()
    const params = {
      ...filterParmas
    }
    return params
  }

  /**
   * 查询
   */
  handleSearch = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error('必填项不能为空')
        return
      }
      this.props.handleSearch(this.searchParams)
    })
  }

  /**
   * 新增
   */
  handleAdd = () => {
    this.props.handleAdd()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { userData } = this.state
    return (
      <div className='dbset-filter'>
        <Form layout='inline'>
          <Row style={styles.form}>
            <p style={styles.title}>查询条件</p>
          </Row>
          <Row style={styles.search}>
            <Form.Item label='用户' style={styles.item}>
              {getFieldDecorator('user_id', {
                rules: [{ required: true, message: '请选择用户' }]
              })(
                <Select
                  allowClear
                  // onChange={this.queryStatusChange}
                  placeholder='请选择用户'
                  style={{ borderRadius: 4, width: 300 }}>
                  {userData &&
                    userData.map((item, i) => {
                      return (
                        <Select.Option value={item.user_id} key={item.user_id + i}>
                          {item.englishName + '_' + (item.chineseName ? item.chineseName : '')}
                        </Select.Option>
                      )
                    })}
                </Select>
              )}
            </Form.Item>
          </Row>
          <Row style={styles.handle}>
            <p style={styles.title}>操作</p>
            <Button type='primary' style={styles.btn} onClick={this.handleSearch}>
              查询
            </Button>
            <Button type='primary' style={styles.btn} onClick={this.handleAdd}>
              新增
            </Button>
          </Row>
        </Form>
      </div>
    )
  }
}

export default Form.create()(PageFilter)
