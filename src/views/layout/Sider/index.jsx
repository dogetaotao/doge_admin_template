import React from 'react';
import {connect} from "react-redux"
import {Layout} from "antd";
import Logo from "./Logo"
import Menu from "./Menu";

const {Sider} = Layout


const LayoutSider = (props) => {

  const {sidebarCollapsed, sidebarLogo} = props
  return (
    <Sider
      collapsible
      collapsed={sidebarCollapsed}
      trigger={null}
      style={{zIndex: "10", position:"fixed", height:"100vh", overflow: "auto"}}
    >
      {sidebarLogo ? <Logo/> : null}
      <Menu/>
    </Sider>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.apps,
    ...state.setting
  }
}


export default connect(mapStateToProps)(LayoutSider);
