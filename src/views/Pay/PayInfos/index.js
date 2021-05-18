import React, { PureComponent } from 'react'
import { message, Table, Button, Modal } from 'antd'
import PageFilter from './components/PageFilter'
import PageModal from './components/PageModal'

import API from '../apis'

class PayInfos extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      payData: null,
      columns: [
        {
          title: '英文名',
          dataIndex: 'englishName',
          key: 'englishName'
        },
        {
          title: '中文名',
          dataIndex: 'chineseName',
          key: 'chineseName'
        },
        {
          title: '工号',
          dataIndex: 'station',
          key: 'station'
        },
        {
          title: '基本工资',
          dataIndex: 'base_pay',
          key: 'base_pay'
        },
        {
          title: '社保',
          dataIndex: 'social_security',
          key: 'social_security',
          render: (text, record) => {
            const value = text * record.base_pay
            const result = value ? '-' + value + '（' + text * 100 + '%' + '）' : 0
            return <>{result}</>
          }
        },
        {
          title: '公积金',
          dataIndex: 'accumulation_fund',
          key: 'accumulation_fund',
          render: (text, record) => {
            const value = text * record.base_pay
            const result = value ? '-' + value + '（' + text * 100 + '%' + '）' : 0
            return <>{result}</>
          }
        },
        {
          title: '医疗',
          dataIndex: 'medical_treatment',
          key: 'medical_treatment',
          render: (text, record) => {
            const value = text * record.base_pay
            const result = value ? '-' + value + '（' + text * 100 + '%' + '）' : 0
            return <>{result}</>
          }
        },
        {
          title: '个人所得税',
          dataIndex: 'income_tax',
          key: 'income_tax',
          render: (text, record) => {
            const value = text * record.base_pay
            const result = value ? '-' + value + '（' + text * 100 + '%' + '）' : 0
            return <>{result}</>
          }
        },
        {
          title: '实发工资',
          dataIndex: 'real_pay',
          key: 'real_pay'
        },
        {
          title: '操作',
          align: 'center',
          render: (text, record) => {
            return (
              <>
                <Button type='primary' onClick={this.handleEditor.bind(this, record)}>
                  编辑
                </Button>
              </>
            )
          }
        }
      ],
      user_id: null
    }
  }

  componentDidMount() {}

  getPersonPayInfos = ({ user_id }) => {
    API.getPersonPayInfos({ user_id })
      .then(res => {
        console.log('payData', res.data)
        this.setState({
          payData: res.data.data
        })
      })
      .catch(err => {
        message.error('获取薪资信息失败!')
      })
  }

  handleSearch = user_id => {
    this.setState(
      {
        user_id: user_id.user_id
      },
      () => {
        this.getPersonPayInfos(user_id)
      }
    )
  }

  handleEditor = record => {
    this.handleEditorRef.receiver(record, this.state.user_id)
  }

  handleInsertOk = () => {
    this.getPersonPayInfos({ user_id: this.state.user_id })
  }

  render() {
    const { payData, columns } = this.state
    return (
      <div>
        <PageFilter handleSearch={this.handleSearch} />
        <Table
          needHighlight
          bordered
          columns={columns}
          dataSource={payData}
          rowKey={(record, index) => index}
          // scroll={scroll}
          pagination={false}
        />
        <PageModal handleInsertOk={this.handleInsertOk} wrappedComponentRef={e => (this.handleEditorRef = e)} />
      </div>
    )
  }
}

export default PayInfos
