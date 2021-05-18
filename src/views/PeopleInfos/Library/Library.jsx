import React, { PureComponent } from 'react'
import PageTable from './components/PageTable'
import PageFilter from './components/PageFilter'
import API from './apis'

const creatSearchParams = () => {
  return {
    englishName: '',
    chineseName: '',
    email: '',
    education: '',
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
      total: 0
    }
  }

  componentDidMount() {
    this.getAllPeopleList()
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
    API.getAllPeopleList(searchObj)
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
    const { total, searchParams, tableDecoureData } = this.state
    return (
      <div>
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
          handlePageChange={this.handlePageChange}
          handleSizeChange={this.handleSizeChange}
          getAllPeopleList={this.getAllPeopleList}
          updateOkFun={this.updateOkFun}
        />
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
