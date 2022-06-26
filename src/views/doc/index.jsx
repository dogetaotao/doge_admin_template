import React from 'react';
import TypingCard from "../../components/TypingCard";

const Doc = () => {

  const cardContent = `
    作者博客请戳 <a href="http://www.dogetaotao.fun">dogetaotao的博客</a>。
  `

  return (
    <div className="app-container">
      <TypingCard title="作者博客" source={cardContent}/>
    </div>
  )
}

export default Doc;
