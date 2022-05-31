import React from 'react';
import TypingCard from "../../components/TypingCard";
const EditorPage = () => {
  const cardContent = `此页面只有Editor角色才可以访问，guest和admin角色看不到`
  return (
    <div className="app-container">
      <TypingCard title="editor界面" source={cardContent}/>
    </div>
  )
}

export default EditorPage;
