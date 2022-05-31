import React from 'react';
import {Card, Progress} from "antd";
import {connect} from "react-redux";
import PanThumb from "../../../components/PanThumb";
import Mallki from "../../../components/Mallki";
import "./index.less"

const BoxCard = (props) => {
  const {avatar} = props

  return (
    <div className="box-card-component">
      <Card
        cover={
          <img
            src="https://tse1-mm.cn.bing.net/th/id/R-C.669852f93abd0fe11f3e2a2d9b862326?rik=ZlIKvbUdKbbXGA&riu=http%3a%2f%2fimg.ewebweb.com%2fuploads%2f20200730%2f22%2f1596118096-QFEPrgdKRB.jpeg&ehk=pl6fQ7dJ55saIInATEaiPg%2bYlKDNMTvSitX%2fB0iyMYA%3d&risl=&pid=ImgRaw&r=0"
            alt="example"
            style={{height: "480px"}}
          />
        }
      >
        <div style={{position: "relative"}}>
          <PanThumb image={avatar} className="panThumb"/>
          <Mallki className="mallki-text" text="daogetaotao"/>
          <div style={{paddingTop: '35px'}} className="progress-item">
            <span>React</span>
            <Progress percent={80}/>
          </div>
          <div className="progress-item">
            <span>JavaScript</span>
            <Progress percent={40}/>
          </div>
          <div className="progress-item">
            <span>Css</span>
            <Progress percent={70}/>
          </div>
          <div className="progress-item">
            <span>Typescript</span>
            <Progress percent={50}/>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default connect((state) => state.user)(BoxCard);
