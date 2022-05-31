import React from "react";
import {Route, HashRouter, Routes, Navigate, Redirect} from "react-router-dom";
import {connect} from "react-redux"
import {getUserInfo} from "../store/actions";
import Login from "../views/login"
import Default from "../views/default";
import NotFound from "../views/error/404";
import Dashboard from "../views/dashboard";
import routeList from "../config/routeMap";

class Router extends React.Component {

  render() {
    const {role} = this.props
    const handleFilter = (route) => {
      return role === 'admin' || !route.roles || route.roles.includes(role)
    }
    return (
      <HashRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/*' element={<Default/>}>
            <Route path='dashboard' element={<Dashboard/>}/>
            {
              routeList.map((route) => {
                return (
                  route.path !== 'dashboard' && handleFilter(route) && (
                    <Route
                      element={<route.component/>}
                      key={route.path}
                      path={route.path}
                    />
                  )
                )
              })
            }
            <Route path='*' element={<NotFound/>}/>
          </Route>
        </Routes>
      </HashRouter>
    )
  }

}

export default connect((state) => state.user, {getUserInfo})(Router)
