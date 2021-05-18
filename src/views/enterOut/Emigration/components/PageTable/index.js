import React, { Component } from 'react'
import { Button, Table, Modal, message } from 'antd'
// import PageModal from '../PageModal'
import './index.scss'
import API from '../../../apis'

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
          title: '操作',
          align: 'center',
          render: (text, record) => {
            return (
              <>
                <Button type='danger' className='operation-btn' onClick={this.handleDelete.bind(this, record)}>
                  删除
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

  deleteAllInfos = user_id => {
    API.deleteAllInfos({ user_id })
      .then(res => {
        message.success('删除成功')
        this.props.updateOkFun()
      })
      .catch(err => {
        message.error('删除失败!')
      })
  }

  handleDelete = record => {
    console.log('luruxinxi', record)
    // this.handleEditorRef.receiver(record)
    const _that = this
    Modal.confirm({
      content: `删除 ${record.englishName} 所有信息??`,
      onOk() {
        _that.deleteAllInfos(record.user_id)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
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
        {/* <PageModal
        {...this.props}
        wrappedComponentRef={(e) => (this.handleEditorRef = e)}
      /> */}
      </div>
    )
  }
}

export default TimeVariable
