import React, { PureComponent } from 'react'
import { message, Table, Button, Modal } from 'antd'
import API from '../apis'
import { getUserInfos } from '@/utils/user'

class PayOwn extends PureComponent {
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
        }
      ]
    }
  }

  handleTitle = ({ sortOrder, sortColumn, filters }) => {
    console.log('nnnnnn', sortOrder, sortColumn, filters)
    return 'nn'
  }

  getPersonPayInfos = user_id => {
    API.getPersonPayInfos({ user_id })
      .then(res => {
        this.setState({
          payData: res.data.data
        })
      })
      .catch(err => {
        message.error('获取薪资信息失败!')
      })
  }

  componentDidMount() {
    const user_id = getUserInfos('user') ? getUserInfos('user').id : null
    this.getPersonPayInfos(user_id)
  }

  render() {
    const { payData, columns } = this.state
    return (
      <div>
        <Table
          needHighlight
          bordered
          columns={columns}
          dataSource={payData}
          rowKey={(record, index) => index}
          // scroll={scroll}
          pagination={false}
        />
      </div>
    )
  }
}

export default PayOwn
