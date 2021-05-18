import React, { PureComponent } from 'react'
import LeftDepartmentList from './components/LeftDepartmentList'
import RightInfos from './components/RightInfos'
import './index.scss'

class JobInfos extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleDepartmentId = (departmentId, data) => {
    this.refs.rightRef.receiver(departmentId, data)
  }

  render() {
    return (
      <div className='job-info'>
        <LeftDepartmentList handleDepartmentId={this.handleDepartmentId} />
        <RightInfos ref='rightRef' />
      </div>
    )
  }
}

export default JobInfos
