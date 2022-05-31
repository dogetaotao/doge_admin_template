import React from "react"
import {useNavigate} from "react-router-dom"
import {logout, getUserInfo} from "../../../store/actions";
import {Menu, Dropdown, Modal, Layout, Avatar} from "antd";
import {
  CaretDownOutlined
} from "@ant-design/icons"
import {connect} from "react-redux";
import Hamburger from "../../../components/Hamburger";
import Settings from "../../../components/Settings"
import BreadCrumb from "../../../components/BreadCrumb"
import FullScreen from "../../../components/FullScreen";
import "./index.less"

const {Header} = Layout

const LayoutHeader = (props) => {
  const {
    token,
    avatar,
    sidebarCollapsed,
    logout,
    getUserInfo,
    showSettings,
    fixedHeader,
  } = props

  const navigate = useNavigate()

  token && getUserInfo(token)
  const handleLogout = (token) => {
    Modal.confirm({
      title: "注销",
      content: "确定要退出系统吗？",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        logout(token)
      }
    })
  }

  const onClick = ({key}) => {
    switch (key) {
      case "logout" :
        handleLogout(token)
        break
      default:
        break
    }
  }

  const menu = (
    <Menu onClick={onClick} items={
      [
        {
          key: 'dashboard',
          label: '首页',
          onClick: () => {
            navigate("/dashboard")
          }
        },
        {
          key: 'project',
          label: '项目地址',
          onClick: () => {
            //待完成
            window.open("https://github.com/dogetaotao/doge_admin_template")
          }
        },
        {
          key: 'blog',
          label: '作者博客',
          onClick: () => {
            window.open("http://www.dogetaotao.fun/")
          }
        },
        {
          type: "divider"
        },
        {
          key: "logout",
          label: "注销"
        }
      ]
    }
    />
  )

  const computedStyle = () => {
    let styles
    if (fixedHeader) {
      if (sidebarCollapsed) {
        styles = {
          width: "calc(100% - 80px)"
        }
      } else {
        styles = {
          width: "calc(100% - 200px)"
        }
      }
    } else {
      styles = {
        width: "100%"
      }
    }
    return styles
  }

  return (
    <>
      {fixedHeader ? <Header/> : null}
      <Header
        style={computedStyle()}
        className={fixedHeader ? "fix-header" : ""}
      >
        <Hamburger/>
        <BreadCrumb/>
        <div className='right-menu'>
          <FullScreen/>
          {showSettings ? <Settings/> : null}
          <div className="dropdown-wrap">
            <Dropdown overlay={menu}>
              <div>
                <Avatar shape="square" size="default" src={avatar}/>
                <CaretDownOutlined style={{color: "rgba(0,0,0,.3)"}}/>
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.apps,
    ...state.user,
    ...state.setting,
  }
}


export default connect(mapStateToProps, {logout, getUserInfo})(LayoutHeader)
