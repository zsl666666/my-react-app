import React, { Component } from 'react'
import { Button, Table } from 'antd'
import PageModal from '../PageModal'
import './index.scss'
import { getUserInfos } from '@/utils/user'

class TimeVariable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          title: 'ID',
          dataIndex: 'user_id',
          key: 'user_id'
        },
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
          title: '角色',
          dataIndex: 'auth',
          key: 'auth',
          render: (text, record) => {
            let stringResult = text === 3 ? '超级管理员' : text === 2 ? '管理员' : text === 1 ? '普通用户' : ''
            return <>{stringResult}</>
          }
        }
      ],
      pageSizeOptions: ['10', '20', '30', '50'],
      flag: false,
      activeUserAuth: 1
    }
  }

  componentDidMount() {
    const activeUserAuth = getUserInfos('user') ? getUserInfos('user').auth : 1
    this.setState(
      {
        activeUserAuth
      },
      () => {
        if (this.state.activeUserAuth === 3) {
          this.setState({
            columns: [
              ...this.state.columns,
              {
                title: '操作',
                align: 'center',
                render: (text, record) => {
                  return (
                    <>
                      <Button type='primary' className='operation-btn' onClick={this.handleEditor.bind(this, record)}>
                        编辑
                      </Button>
                    </>
                  )
                }
              }
            ]
          })
        }
      }
    )
  }

  handleEditor = record => {
    this.handleEditorRef.receiver(record)
  }

  /**
   * 表格页改变回调函数
   * @param { 页数 } page
   * @param { 条数 } size
   */
  handlePageChange = (page, size) => {
    this.props.handlePageChange(page, size)
  }

  /**
   * 表格每页展示条数改变回调函数
   * @param { 当前页数 } page
   * @param { 条数 } size
   */
  handleSizeChange = (page, size) => {
    this.props.handleSizeChange(page, size)
  }

  render() {
    const { columns, pageSizeOptions } = this.state
    const {
      total,
      tableDecoureData,
      searchParams: { pageNum, pageSize }
    } = this.props
    return (
      <div className='DBConfig-table'>
        <Table
          className='DBConfig-table'
          needHighlight
          bordered
          columns={columns}
          dataSource={tableDecoureData}
          rowKey={(record, index) => record.user_id}
          // scroll={scroll}
          pagination={{
            pageSize: pageSize,
            defaultCurrent: pageNum,
            current: pageNum,
            total: total,
            showSizeChanger: true,
            pageSizeOptions: pageSizeOptions,
            showTotal: (total, range) => `共${total}条`,
            showQuickJumper: true,
            onShowSizeChange: (current, size) => {
              this.handleSizeChange(current, size)
            },
            onChange: (page, pageSize) => {
              this.handlePageChange(page, pageSize)
            }
          }}
        />
        <PageModal {...this.props} wrappedComponentRef={e => (this.handleEditorRef = e)} />
      </div>
    )
  }
}

export default TimeVariable
