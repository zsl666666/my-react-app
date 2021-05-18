import React, { PureComponent } from 'react'
import PageTable from './components/PageTable'
import PageFilter from './components/PageFilter'
import API from '../../../apis'

import './index.scss'

const creatSearchParams = () => {
  return {
    departmentId: null,
    englishName: '',
    chineseName: '',
    email: '',
    station: '',
    pageNum: 1,
    pageSize: 10
  }
}

class Library extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchParams: creatSearchParams(),
      tableDecoureData: [],
      total: 0,
      allDepartment: null
    }
  }

  receiver = (departmentId, allDepartment) => {
    console.log('接收数据', departmentId, allDepartment)
    this.setState(
      {
        searchParams: {
          ...this.state.searchParams,
          departmentId
        },
        allDepartment
      },
      () => {
        this.getAllPeopleList()
      }
    )
  }

  // 获取 所有用户 数据
  getAllPeopleList = () => {
    const { searchParams } = this.state
    const searchObj = {}
    Object.keys(searchParams).forEach(item => {
      if (searchParams[item]) {
        searchObj[item] = searchParams[item]
      }
    })
    API.getAllJobInfos(searchObj)
      .then(res => {
        this.setState({
          tableDecoureData: res.data.data || [],
          total: res.data.total || 0
        })
      })
      .catch(err => {
        // message.error(err.data.msg)
        console.log('errerr', err)
      })
  }

  /**
   * 处理 table 页数改变回调函数
   * @param { 页数 } page
   * @param { 条数 } size
   */
  handlePageChange = (page, size) => {
    this.setState(
      {
        searchParams: {
          ...this.state.searchParams,
          ...{
            pageNum: page,
            pageSize: size
          }
        }
      },
      () => {
        this.getAllPeopleList()
      }
    )
  }

  /**
   * 处理 table 每页展示条数改变回调函数
   * @param { 当前页数 } page
   * @param { 条数 } size
   */
  handleSizeChange = (page, size) => {
    this.setState(
      {
        searchParams: {
          ...this.state.searchParams,
          ...{
            pageNum: 1,
            pageSize: size
          }
        }
      },
      () => {
        this.getAllPeopleList()
      }
    )
  }

  /**
   * 点击查询按钮
   */
  handleSearch = searchParams => {
    this.setState(
      {
        searchParams: searchParams
      },
      () => {
        this.getAllPeopleList()
      }
    )
  }

  updateOkFun = () => {
    this.getAllPeopleList()
  }

  render() {
    const { total, searchParams, tableDecoureData, allDepartment } = this.state
    console.log('gggggggggg', allDepartment)
    return (
      <div className='job-right'>
        <PageFilter
          {...this.props}
          searchParams={searchParams}
          handleSearch={this.handleSearch}
          // handleAdd={this.handleAdd}
        />
        <PageTable
          {...this.props}
          total={total}
          searchParams={searchParams}
          tableDecoureData={tableDecoureData}
          allDepartment={allDepartment}
          handlePageChange={this.handlePageChange}
          handleSizeChange={this.handleSizeChange}
          getAllPeopleList={this.getAllPeopleList}
          updateOkFun={this.updateOkFun}
        />
      </div>
    )
  }
}

export default Library
