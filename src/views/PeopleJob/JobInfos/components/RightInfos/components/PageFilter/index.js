import React, { Component } from 'react'
import { Form, Input, Row, Button } from 'antd'
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
    width: '140px'
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
      email: '',
      station: ''
    }
  }

  /**
   * 查询参数处理
   */
  get searchParams() {
    const filterParmas = this.props.form.getFieldsValue()
    const params = {
      ...this.props.searchParams,
      ...filterParmas,
      pageNum: 1
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
            <Form.Item label='英文名' style={styles.item}>
              {getFieldDecorator(
                'englishName',
                {}
              )(<Input style={styles.formInput} allowClear placeholder='请输入英文名' />)}
            </Form.Item>
            <Form.Item label='中文名' style={styles.item}>
              {getFieldDecorator(
                'chineseName',
                {}
              )(<Input style={styles.formInput} allowClear placeholder='请输入中文名' />)}
            </Form.Item>
            <Form.Item label='Email' style={styles.item}>
              {getFieldDecorator('email', {})(<Input style={styles.formInput} allowClear placeholder='请输入Email' />)}
            </Form.Item>
            <Form.Item label='工号' style={styles.item}>
              {getFieldDecorator('station', {})(<Input style={styles.formInput} allowClear placeholder='请输入工位' />)}
            </Form.Item>
          </Row>
          <Row style={styles.handle}>
            <p style={styles.title}>操作</p>
            <Button type='primary' style={styles.btn} onClick={this.handleSearch}>
              查询
            </Button>
          </Row>
        </Form>
      </div>
    )
  }
}

export default Form.create()(PageFilter)
