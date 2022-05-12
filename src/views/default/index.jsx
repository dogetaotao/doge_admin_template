import React from "react";
import Layout from "../layout"
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {getUserInfo} from "../../store/actions";

const Default = (props) => {
  const {token, role, getUserInfo} = props
  const auto = () => {
    if (!token) {
      return <Navigate to='/login'/>
    } else {
      if (role) {
        return <Layout/>
      } else {
        getUserInfo(token).then(() => <Layout/>)
      }
    }
  }

  return (
    auto()
  )
}

export default connect((state) => state.user, {getUserInfo})(Default)
