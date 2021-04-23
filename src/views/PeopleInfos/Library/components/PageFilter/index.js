import React, { Component } from 'react'
import { Form, Input, Row, Button, Select, DatePicker } from 'antd'
// import { librariesCodeList } from '../../constants/selects'
import './index.scss'

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
      name: '',
      value: '',
      note: ''
    }
  }

  /**
   * 查询参数处理
   */
  get searchParams() {
    const filterParmas = this.props.form.getFieldsValue()
    filterParmas.createTimeFormat = filterParmas.createTimeFormat
      ? new Date(filterParmas.createTimeFormat).format('yyyy-MM-dd')
      : ''
    const params = {
      ...this.props.searchParams,
      ...filterParmas,
      pageNo: 1
    }
    return params
  }

  /**
   * 查询
   */
  handleSearch = () => {
    this.props.handleSearch(this.searchParams)
  }

  /**
   * 新增
   */
  handleAdd = () => {
    this.props.handleAdd()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='dbset-filter'>
        <Form layout='inline'>
          <Row style={styles.form}>
            <p style={styles.title}>查询条件</p>
          </Row>
          <Row style={styles.search}>
            <Form.Item label='DB简称' style={styles.item}>
              {getFieldDecorator('name', {})(<Input allowClear placeholder='请输入DB简称' />)}
            </Form.Item>
            <Form.Item label='描述' style={styles.item}>
              {getFieldDecorator('note', {})(<Input allowClear placeholder='请输入描述' />)}
            </Form.Item>
            <Form.Item label='创建人' style={styles.item}>
              {getFieldDecorator('creator', {})(<Input allowClear placeholder='请输入创建人' />)}
            </Form.Item>
            {/* <Form.Item label="DB配置类型" style={styles.item}>
            {getFieldDecorator('isMulti', {
              initialValue: '0'
            })(
              <Select
                placeholder="请选择"
                style={{ width: '190px' }}
              >
                {librariesCodeList.map(item => (
                  <Select.Option key={item.value} value={`${item.value}`}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item> */}
            <Form.Item label='创建时间' style={styles.item}>
              {getFieldDecorator('createTimeFormat', {})(<DatePicker format='YYYY-MM-DD' style={{ width: '190px' }} />)}
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
