import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Icon } from 'antd'
import CustomMenu from '@/components/CustomMenu'

const { Sider } = Layout

const AppAside = props => {
  let { menuToggle, menu } = props
  return (
    <Sider className='aside' collapsed={menuToggle}>
      <div className='logo'>
        <a rel='noopener noreferrer' href='https://github.com/ltadpoles' target='_blank'>
          {/* <Icon type='github' style={{ fontSize: '3.8rem', color: '#fff' }} /> */}
          <img
            src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx4.sinaimg.cn%2Fmw690%2F66b6e1c4ly1fe74swo37rj20le0ladg5.jpg&refer=http%3A%2F%2Fwx4.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613120543&t=a21446fad6a4dab01e121e4140da3d56'
            style={{ width: '100%', height: '100%' }}
          />
        </a>
      </div>
      <CustomMenu menu={menu}></CustomMenu>
    </Sider>
  )
}

AppAside.propTypes = {
  menuToggle: PropTypes.bool,
  menu: PropTypes.array.isRequired
}

export default AppAside
