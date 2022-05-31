import React from "react";
import DocumentTitle from "react-document-title"
import {Navigate, useLocation, Outlet} from "react-router-dom";
import {Layout} from "antd";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import menuList from "../../../config/menuConfig"
import {getMenuItemInMenuListByProperty} from "../../../utils";

const {Content} = Layout

const getPageTitle = (menuList, pathName) => {
  let title = "doge admin"
  let item = getMenuItemInMenuListByProperty(menuList, "path", pathName)
  if (item) {
    title = `${item.title} - doge admin`
  }
  return title
}

const LayoutContent = () => {
  const location = useLocation()
  const {pathname} = location
  return (
    <DocumentTitle title={getPageTitle(menuList, pathname)}>
      <Content style={{height: "calc(100% - 100px)"}}>
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            timeout={500}
            className='fade'
            exit={false}
          >
            <div>
              {pathname === "/" && <Navigate replace={true} to="/dashboard"/>}
              <Outlet/>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Content>
    </DocumentTitle>
  )
}

export default LayoutContent
