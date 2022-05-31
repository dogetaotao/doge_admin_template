import React from 'react';
import {Row, Col, Button} from "antd"
import {useNavigate} from "react-router-dom";
import "./index.less"
import x from "./24.png"

const NotFound = () => {
  const navigate = useNavigate()
  const goHome = () => navigate("/")
  return (
    <Row className="not-found">
      <Col span={12}>
        <img src={x}  alt="404" style={{width: "130%"}}/>
      </Col>
      <Col span={12} className="right">
        <h1>404</h1>
        <h2>抱歉，你访问的页面不存在</h2>
        <h2>(((φ(◎ロ◎;)φ)))</h2>
        <div>
          <Button type="primary" onClick={goHome}>
            回到首页
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default NotFound;
