import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import CustomMenu from '@/components/CustomMenu'

const { Sider } = Layout

const AppAside = props => {
  let { menuToggle, menu } = props
  return (
    <Sider className='aside' collapsed={menuToggle}>
      <div className='logo'>
        <a rel='noopener noreferrer' href='https://github.com/ltadpoles' target='_blank'>
          {/* <Icon type='github' style={{ fontSize: '3.8rem', color: '#fff' }} /> */}
          <img alt='' src={require('@/assets/homeMain/homeLogo2.jpg')} style={{ width: '100%', height: '100%' }} />
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
