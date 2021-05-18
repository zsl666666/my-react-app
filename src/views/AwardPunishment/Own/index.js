import React, { PureComponent } from 'react'
import { message, Table } from 'antd'
import API from '../apis'
import { getUserInfos } from '@/utils/user'

class Own extends PureComponent {
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
          title: '奖励信息',
          dataIndex: 'award',
          key: 'award'
        },
        {
          title: '惩罚信息',
          dataIndex: 'punishment',
          key: 'punishment'
        }
      ]
    }
  }

  componentDidMount() {
    const user_id = getUserInfos('user') ? getUserInfos('user').id : null
    this.getAwardPunishment(user_id)
  }

  getAwardPunishment = user_id => {
    API.getAwardPunishment({ user_id })
      .then(res => {
        this.setState({
          payData: res.data.data
        })
      })
      .catch(err => {
        message.error('获取失败!')
      })
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

export default Own
