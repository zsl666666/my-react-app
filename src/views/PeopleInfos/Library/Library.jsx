import React, { PureComponent } from 'react'
// import PageTable from './components/PageTable'
import PageFilter from './components/PageFilter'
// import PageModal from './components/PageModal'
// import { message } from 'antd'
// import API from './apis'
// import './index.scss'

const creatSearchParams = () => {
  return {
    name: '',
    isMulti: '0',
    note: '',
    createTimeFormat: '',
    creator: '',
    pageNo: 1,
    pageSize: 10
  }
}

class Library extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchParams: creatSearchParams(),
      tableDecoureData: [],
      total: 0
    }
  }
  render() {
    const { total, searchParams, tableDecoureData } = this.state
    return (
      <div>
        <PageFilter
          {...this.props}
          searchParams={searchParams}
          // handleSearch={this.handleSearch}
          // handleAdd={this.handleAdd}
        />
        {/* <PageTable
        {...this.props}
        total={total}
        searchParams={searchParams}
        tableDecoureData={tableDecoureData}
        handlePageChange={this.handlePageChange}
        handleSizeChange={this.handleSizeChange}
        getDBLists={this.getDBLists}
      /> */}
        {/* <PageModal
        {...this.props}
        DbAddOk={this.DbAddOk}
        wrappedComponentRef={(e) => (this.RefDbModal = e)}
      /> */}
      </div>
    )
  }
}

export default Library
