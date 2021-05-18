import React, { Component } from 'react'
import { Button, Table } from 'antd'
import './index.scss'
import PageModal from '../PageModal'
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
          dataIndex: 'people_infos.englishName',
          key: 'people_infos.englishName'
        },
        {
          title: '中文名',
          dataIndex: 'people_infos.chineseName',
          key: 'people_infos.chineseName'
        },
        {
          title: '性别',
          dataIndex: 'people_infos.sex',
          key: 'people_infos.sex'
        },
        {
          title: '工号',
          dataIndex: 'people_infos.station',
          key: 'people_infos.station'
        },
        {
          title: '职位名称',
          dataIndex: 'job_infos.specificJob',
          key: 'job_infos.specificJob'
        },
        {
          title: '职位描述',
          dataIndex: 'job_infos.describeJob',
          key: 'job_infos.describeJob'
        }
      ],
      pageSizeOptions: ['10', '20', '30', '50'],
      flag: false
    }
  }

  componentDidMount() {
    const activeUserAuth = getUserInfos('user') ? getUserInfos('user').auth : 1
    this.setState(
      {
        activeUserAuth
      },
      () => {
        if (this.state.activeUserAuth !== 1) {
          this.setState({
            columns: [
              ...this.state.columns,
              {
                title: '操作',
                align: 'center',
                with: 100,
                render: (text, record) => {
                  if (record.user_id) {
                    return (
                      <>
                        <Button type='primary' className='operation-btn' onClick={this.handleEditor.bind(this, record)}>
                          编辑
                        </Button>
                      </>
                    )
                  } else {
                    return <></>
                  }
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
