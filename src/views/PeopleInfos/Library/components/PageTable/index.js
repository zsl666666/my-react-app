import React, { Component } from 'react'
import { Button, Table } from 'antd'
import PageDrawer from '../PageDrawer'
import PageModal from '../PageModal'
import './index.scss'

class TimeVariable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          title: 'ID',
          dataIndex: 'people_infos_id',
          key: 'people_infos_id'
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
          title: '性别',
          dataIndex: 'sex',
          key: 'sex'
        },
        {
          title: '出生年月',
          dataIndex: 'birth',
          key: 'birth'
        },
        {
          title: '入职时间',
          dataIndex: 'createAt',
          key: 'createAt',
          render: text => <span>{new Date(text).format('yyyy-MM-dd')}</span>
        },
        {
          title: '工号',
          dataIndex: 'station',
          key: 'station'
        },
        {
          title: '操作',
          align: 'center',
          render: (text, record) => {
            return (
              <>
                <Button type='primary' className='operation-btn' onClick={this.handleDetail.bind(this, record)}>
                  详情
                </Button>
                <Button type='primary' className='operation-btn' onClick={this.handleEditor.bind(this, record)}>
                  编辑
                </Button>
              </>
            )
          }
        }
      ],
      pageSizeOptions: ['10', '20', '30', '50'],
      flag: false
    }
  }

  handleDetail = record => {
    this.handleDetailRef.receiver(record)
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
          rowKey={(record, index) => record.id}
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
        <PageDrawer {...this.props} wrappedComponentRef={e => (this.handleDetailRef = e)} />
        <PageModal {...this.props} wrappedComponentRef={e => (this.handleEditorRef = e)} />
      </div>
    )
  }
}

export default TimeVariable
