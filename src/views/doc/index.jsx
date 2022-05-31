import React from 'react';
import TypingCard from "../../components/TypingCard";

const Doc = () => {

  const cardContent = `
    作者博客请戳 <a href="http://www.dogetaotao.fun">dogetaotao的博客</a>。
    此项目参照难凉热血大神的项目管理系统。
  `


  return (
    <div className="app-container">
      <TypingCard title="作者博客" source={cardContent}/>
    </div>
  )
}

export default Doc;
