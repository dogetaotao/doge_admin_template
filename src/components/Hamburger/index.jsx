import React from 'react';
import {connect} from "react-redux";
import {toggleSideBar} from "../../store/actions"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons"
import "./index.less"

const Hamburger = (props) => {

  const {sidebarCollapsed, toggleSideBar} = props

  return (
    <div className="hamburger-container">
      {sidebarCollapsed?  <MenuUnfoldOutlined onClick={toggleSideBar}/> : <MenuFoldOutlined onClick={toggleSideBar}/>}
    </div>
  )
}

export default connect((state) => state.apps, {toggleSideBar})(Hamburger);
