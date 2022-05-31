import React from 'react';
import TypingCard from "../../components/TypingCard";
const GuestPage = () => {
  const cardContent = `此页面只有guest角色才可以访问，admin和editor角色看不到`
  return (
    <div className="app-container">
      <TypingCard title="guest界面" source={cardContent}/>
    </div>
  )
}

export default GuestPage;
