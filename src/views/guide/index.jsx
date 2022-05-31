import React from 'react';
import {Button} from "antd";
import Driver from "driver.js"
import "driver.js/dist/driver.min.css"
import steps from "./step"
import TypingCard from "../../components/TypingCard";

const driver = new Driver({
  animate: true,
  opacity: 0.75,
  doneBtnText: "完成",
  closeBtnText: "关闭",
  nextBtnText: "下一步",
  prevBtnText: "上一步"
})

const guide = function () {
  driver.defineSteps(steps);
  driver.start();
};
const Guide = function () {
  const cardContent = `引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。
                       本Demo是基于<a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js</a>`
  return (
    <div className="app-container">
      <TypingCard title='新手引导' source={cardContent}/>
      <br/>
      <Button type="primary" onClick={guide}>
        打开引导
      </Button>
    </div>
  );
};

export default Guide;
