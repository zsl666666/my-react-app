import React, { PureComponent } from 'react'
import { message, Table, Button, Modal, Input } from 'antd'
import API from '../apis'

import PageModal from './components/PageModal'

class JobChange extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      allDepartment: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '部门名称',
          dataIndex: 'departmentName',
          key: 'departmentName'
        },
        {
          title: '操作',
          align: 'center',
          render: (text, record) => {
            return (
              <>
                <Button
                  type='primary'
                  style={{
                    margin: 5
                  }}
                  onClick={this.handleEditor.bind(this, record)}>
                  编辑
                </Button>
                <Button
                  type='danger'
                  style={{
                    margin: 5
                  }}
                  onClick={this.handleDelete.bind(this, record)}>
                  删除
                </Button>
              </>
            )
          }
        }
      ],
      visible: false,
      visibleUpdate: false,
      departmentUpdateName: null,
      departmentUpdateId: null
    }
  }

  componentDidMount() {
    this.getAllDepartments()
  }

  // 删除部门
  deleteDepartment = departmentId => {
    API.deleteDepartment({
      departmentId
    })
      .then(res => {
        message.success(res.data.data.msg || '删除成功')
        this.getAllDepartments()
      })
      .catch(err => {
        message.error('删除失败')
      })
  }

  // 修改部门
  renewalDepartment = () => {
    API.renewalDepartment({
      departmentId: this.state.departmentUpdateId,
      departmentName: this.state.departmentUpdateName
    })
      .then(res => {
        message.success(res.data.data.msg || '修改成功')
        this.setState(
          {
            visibleUpdate: false
          },
          () => {
            this.getAllDepartments()
          }
        )
      })
      .catch(err => {
        message.error('修改失败')
      })
  }

  handleEditor = record => {
    this.setState({
      visibleUpdate: true,
      departmentUpdateName: record.departmentName,
      departmentUpdateId: record.id
    })
  }

  handleDelete = record => {
    Modal.confirm({
      title: `确定要删除 ${record.departmentName} 部门么？`,
      content: '此操作不可逆，要三思哦！！！',
      maskClosable: false,
      onOk: () => {
        this.deleteDepartment(record.id)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  // 获取部门信息
  getAllDepartments = () => {
    API.getAllDepartments()
      .then(res => {
        this.setState({
          allDepartment: res.data.data || []
        })
      })
      .catch(err => {
        message.error('查询部门失败!')
      })
  }

  handleAdd = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleUpdateCancel = () => {
    this.setState({
      visibleUpdate: false
    })
  }

  handleUpdateOk = () => {
    this.renewalDepartment()
  }

  handleChange = e => {
    this.setState({
      departmentUpdateName: e.target.value
    })
  }

  render() {
    const { allDepartment, columns, visible } = this.state
    return (
      <div>
        <Button onClick={this.handleAdd} type='primary' style={{ marginBottom: 16 }}>
          新增
        </Button>
        <Table
          needHighlight
          bordered
          columns={columns}
          dataSource={allDepartment}
          rowKey={(record, index) => record.id}
          // scroll={scroll}
          // pagination={{
          // }}
        />
        <PageModal visible={visible} handleCancel={this.handleCancel} />
        <Modal
          title={`编辑 ${this.state.departmentUpdateName}`}
          visible={this.state.visibleUpdate}
          onOk={this.handleUpdateOk}
          onCancel={this.handleUpdateCancel}>
          <Input value={this.state.departmentUpdateName} onChange={this.handleChange} />
        </Modal>
      </div>
    )
  }
}

export default JobChange
