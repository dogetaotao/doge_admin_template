import React from 'react';
import {Row, Col} from "antd";
import CountUp from "react-countup"
import "./index.less"
import {
  MessageOutlined, PayCircleOutlined, ShoppingCartOutlined,
  UserOutlined,


} from "@ant-design/icons";


const chartList = [
  {
    type: "New Visits",
    icon: <UserOutlined style={{fontSize: 55, color: "#40c9c6"}} className="New Visits"/>,
    num: 99900,
    color: "#40c9c6",
  },
  {
    type: "Messages",
    icon: <MessageOutlined style={{fontSize: 55, color: "#36a3f7"}} className="Messages"/>,
    num: 888888,
    color: "#36a3f7",
  },
  {
    type: "Purchases",
    icon: <PayCircleOutlined style={{fontSize: 55, color: "#f4516c"}} className="Purchases"/>,
    num: 987654,
    color: "#f4516c",
  },
  {
    type: "Shoppings",
    icon: <ShoppingCartOutlined style={{fontSize: 55, color: "#f6ab40"}} className="Shoppings"/>,
    num: 123456,
    color: "#f6ab40",
  },
];


const PanelGroup = (props) => {
  const {handleSetLineChartData} = props
  return (
    <div className="panel-group-container">
      <Row gutter={40} className="panel-group">
        {chartList.map((chart, i) => (
          <Col
            key={i}
            lg={6}
            sm={12}
            xs={12}
            onClick={handleSetLineChartData.bind(this, chart.type)}
            className="card-panel-col"
          >
            <div className="card-panel">
              <div className="card-panel-icon-wrapper">
                {chart.icon}
              </div>
              <div className="card-panel-description">
                <p className="card-panel-text">{chart.type}</p>
                <CountUp end={chart.num} start={0} className="card-panel-num"/>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default PanelGroup;
