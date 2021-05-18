import React, { PureComponent } from 'react'
import { Table, message, Button, Modal, Input, Row, Col } from 'antd'
import PageFilter from './components/PageFilter'
import PageModal from './components/PageModal'

import API from '../apis'

class Change extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      user_id: null,
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
        },
        {
          title: '操作',
          align: 'center',
          with: 150,
          render: (text, record) => {
            return (
              <>
                <Button type='primary' onClick={this.handleEditor.bind(this, record)}>
                  编辑
                </Button>
                <Button type='danger' onClick={this.handleDelete.bind(this, record)} style={{ marginLeft: 10 }}>
                  删除
                </Button>
              </>
            )
          }
        }
      ],
      visible: false,
      punishment: null,
      award: null
    }
  }

  handleSearch = user_id => {
    this.setState(
      {
        user_id: user_id.user_id
      },
      () => {
        this.getAwardPunishment(this.state.user_id)
      }
    )
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

  updateAwardPunishment = () => {
    API.updateAwardPunishment({
      user_id: this.state.user_id,
      award: this.state.award,
      punishment: this.state.punishment
    })
      .then(res => {
        message.success(res.data.data.msg || '更新成功')
        this.setState(
          {
            visible: false
          },
          () => {
            this.getAwardPunishment(this.state.user_id)
          }
        )
      })
      .catch(err => {
        message.error('更新失败!')
      })
  }

  // 删除
  deleteAwardPunishment = user_id => {
    API.deleteAwardPunishment({ user_id })
      .then(res => {
        message.success('删除成功')
        this.getAwardPunishment(user_id)
      })
      .catch(err => {
        message.error('删除失败!')
      })
  }

  handleEditor = record => {
    this.setState({
      visible: true,
      punishment: record.punishment,
      award: record.award
    })
  }

  handleDelete = record => {
    Modal.confirm({
      title: '确定要删除么？',
      content: '此操作不可逆，要三思哦！！！',
      maskClosable: false,
      onOk: () => {
        this.deleteAwardPunishment(this.state.user_id)
      },
      onCancel() {
        // console.log('Cancel');
      }
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleAwardChange = e => {
    this.setState({
      award: e.target.value
    })
  }

  handlePunishmentChange = e => {
    this.setState({
      punishment: e.target.value
    })
  }

  handleOk = () => {
    this.updateAwardPunishment()
  }

  handleAdd = () => {
    this.handleAddRef.receiver()
  }

  render() {
    const { payData, columns } = this.state
    return (
      <div>
        <PageFilter handleSearch={this.handleSearch} handleAdd={this.handleAdd} />
        <Table
          needHighlight
          bordered
          columns={columns}
          dataSource={payData}
          rowKey={(record, index) => index}
          // scroll={scroll}
          pagination={false}
        />
        <PageModal wrappedComponentRef={e => (this.handleAddRef = e)} />
        <Modal title={'编辑'} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Row>
            <Col span={4}>奖励信息：</Col>
            <Col span={18}>
              <Input.TextArea value={this.state.award} onChange={this.handleAwardChange} />
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col span={4}>惩罚信息：</Col>
            <Col span={18}>
              <Input.TextArea value={this.state.punishment} onChange={this.handlePunishmentChange} />
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

export default Change
