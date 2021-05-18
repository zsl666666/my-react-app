import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Icon, Layout, Avatar, Badge } from 'antd'
import { getUserInfos } from '@/utils/user'

const { Header } = Layout

const AppHeader = props => {
  let { menuClick, avatar, menuToggle, loginOut } = props

  const userName = () => {
    const auth = getUserInfos('user') ? getUserInfos('user').auth : 1
    let authName
    switch (auth) {
      case 3:
        authName = '超级管理员'
        break
      case 2:
        authName = '管理员'
        break
      case 1:
        authName = '普通用户'
        break
      default:
        authName = '普通用户'
    }
    return authName
  }

  const menu = (
    <Menu>
      <Menu.ItemGroup title='用户信息'>
        <Menu.Divider />
        <Menu.Item>
          <Icon type='user' />
          {getUserInfos('user') ? getUserInfos('user').name : ''}
        </Menu.Item>
        <Menu.Item>
          <Icon type='smile' />
          {userName()}
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item>
        <span onClick={loginOut}>
          <Icon type='setting' /> 退出登录
        </span>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className='header'>
      <div className='left'>
        <Icon style={{ fontSize: '2rem' }} onClick={menuClick} type={menuToggle ? 'menu-unfold' : 'menu-fold'} />
      </div>
      <div className='right'>
        <div className='mr15'>
          <a rel='noopener noreferrer' href='https://github.com/zsl666666/my-react-app' target='_blank'>
            <Icon type='github' style={{ color: '#000' }} />
          </a>
        </div>
        {/* <div className='mr15'>
          <Badge dot={true} offset={[-2, 0]}>
            <a href='https://github.com/ltadpoles/react-admin' style={{ color: '#000' }}>
            <a href='https://github.com/zsl666666/my-react-app' style={{ color: '#000' }}>
              <Icon type='bell' />
            </a>
          </Badge>
        </div> */}
        <div>
          <Dropdown overlay={menu} overlayStyle={{ width: '20rem' }}>
            <div className='ant-dropdown-link' style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Avatar icon='user' src={avatar} alt='avatar' style={{ marginRight: 10 }} />
              <span style={{ color: '#1890ff' }}>{userName()}</span>
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}

AppHeader.propTypes = {
  menuClick: PropTypes.func,
  avatar: PropTypes.string,
  menuToggle: PropTypes.bool,
  loginOut: PropTypes.func
}

export default React.memo(AppHeader)
