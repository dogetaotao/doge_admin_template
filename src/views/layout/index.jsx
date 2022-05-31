import React, {useEffect, useState} from 'react';
import {Layout} from "antd";
import Header from "./Header"
import Content from "./Content"
import RightPanel from "./RightPanel";
import TagsView from "./TagsView";
import Sider from "./Sider";
import {connect} from "react-redux";
import "./index.less"

const Main = (props) => {
  const {tagsView, sidebarCollapsed} = props

  const computedStyle = () => {
    let styles
    if (sidebarCollapsed) {
      styles = {
        width: "80px",
      }
    } else {
      styles = {
        width: "200px",
      }
    }
    return styles
  }

  return (
    <Layout style={{minHeight: "100vh"}}>
      <Sider/>
      <div className="side-bar-mine" style={computedStyle()}/>
      <Layout>
        <Header/>
        {tagsView ? <TagsView/> : null}
        <Content/>
        <RightPanel/>
      </Layout>
    </Layout>
  )
}




export default connect((state) => {return {...state.apps, ...state.setting}})(Main);
