import React, {useEffect} from 'react';
import TagList from "./components/TagList";
import "./index.less"
import {connect} from "react-redux";

const TagsView = () => {

  return (
    <div className="tagsView-container">
      <TagList/>
    </div>
  )
}

export default connect((state) => state.setting)(TagsView);
