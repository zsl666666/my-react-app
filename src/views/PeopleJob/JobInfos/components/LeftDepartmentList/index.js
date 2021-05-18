import React, { PureComponent } from 'react'
import { message, Menu } from 'antd'
import API from '../../../apis'
import './index.scss'

class LeftDepartmentList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      allDepartment: []
    }
  }

  componentDidMount() {
    this.getAllDepartments()
  }

  getAllDepartments = () => {
    API.getAllDepartments()
      .then(res => {
        this.setState(
          {
            allDepartment: res.data.data || []
          },
          () => {
            this.props.handleDepartmentId(this.state.allDepartment[0].id, this.state.allDepartment)
          }
        )
      })
      .catch(err => {
        message.error('获取部门失败！')
      })
  }

  handleMenuFun = e => {
    this.props.handleDepartmentId(e.key, this.state.allDepartment)
  }

  render() {
    const { allDepartment } = this.state
    return (
      <div className='department-left'>
        <Menu
          defaultSelectedKeys={['1']}
          mode='inline'
          theme='light'
          style={{
            width: 200,
            border: '1px solid #f0f2f5',
            borderRadius: 5
          }}
          onClick={this.handleMenuFun}>
          {allDepartment.length &&
            allDepartment.map((e, i) => {
              return (
                <Menu.Item key={`${e.id}`}>
                  <span>{e.departmentName}</span>
                </Menu.Item>
              )
            })}
        </Menu>
      </div>
    )
  }
}

export default LeftDepartmentList
