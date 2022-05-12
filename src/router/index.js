import React from "react";
import {Route, HashRouter, Routes, Navigate, Redirect} from "react-router-dom";
import {connect} from "react-redux"
import {getUserInfo} from "../store/actions";
import Login from "../views/login"
import Default from "../views/default";

class Router extends React.Component {
  render() {
    console.log(this.props)
    return (
      <HashRouter>
        <Routes>
          <Route exact path='/login' element={<Login/>}/>
          <Route path='/' element={<Default/>}
          />
        </Routes>
      </HashRouter>
    )
  }

}

export default connect((state) => state.user, {getUserInfo})(Router)
