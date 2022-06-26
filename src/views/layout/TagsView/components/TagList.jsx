import React, {useRef, useState} from 'react';
import {connect} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {Scrollbars} from "react-custom-scrollbars"
import {Tag} from "antd";
import {useClickListener} from "../../../../hooks"
import {deleteTags, emptyTagList, closeOtherTags} from "../../../../store/actions"
import store from "../../../../store";


const TagList = (props) => {

  //state
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [menuVisible, setMenuVisible] = useState(false)
  const [currentTag, setCurrentTag] = useState(null)

  const tagListContainer = useRef(null)
  const contextMenuContainer = useRef(null)

  const location = useLocation()
  const navigate = useNavigate()

  const currentPath = useLocation().pathname

  const {tagList} = props

  const handleClose = (tag) => {

    const {deleteTags} = props
    const path = tag.path
    const currentPath = location.pathname
    const length = tagList.length
    //如果关闭当前页，跳转到最后一个页面
    if (path === currentPath) {
      navigate(tagList[length - 1].path)
    }
    // 如果关闭的是最后的tag ,且当前显示的也是最后的tag对应的页面，才做路由跳转
    if (path === tagList[length - 1].path &&
      currentPath === tagList[length - 1].path
    ) {
      if (length - 2 > 0) {
        navigate(tagList[length - 2].path)
      } else if (length === 2) {
        navigate(tagList[0].path)
      }
    }
    deleteTags(tag)

  }
  const handleClick = (path) => {
    navigate(path)
  }

  const openContextMenu = (tag, event) => {

    event.preventDefault()
    const menuMinWidth = 105
    const clickX = event.clientX
    const clickY = event.clientY
    const clientWidth = tagListContainer.current.clientWidth
    const maxLeft = clientWidth - menuMinWidth
    if (clickX > maxLeft) {
      setLeft(clickX - menuMinWidth + 15)
    } else {
      setLeft(clickX)
    }
    setTop(clickY)
    setMenuVisible(true)
    setCurrentTag(tag)
  }

  const closeContextMenu = () => {
    setMenuVisible(false)
  }

  //点击其他地方关闭选项卡
  const handleClickOutSide = (event) => {
    const isOutSide = !(
      contextMenuContainer.current &&
      contextMenuContainer.current.contains(event.target)
    )
    if (isOutSide && menuVisible) {
      closeContextMenu()
    }
  }
  //自定义hooks绑定监听事件
  useClickListener(handleClickOutSide)

  const handleCloseAllTags = () => {
    store.dispatch(emptyTagList())
    navigate("/dashboard")
    closeContextMenu()
  }

  const handleCloseOtherTags = () => {
    const currenTag = currentTag
    const {path} = currenTag
    store.dispatch(closeOtherTags(currenTag))
    navigate(path)
    closeContextMenu()
  }


  return (
    <>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        hideTracksWhenNotNeeded={true}
        renderView={(props) => (
          <div {...props} className="scrollbar-container"/>
        )}
        renderTrackVertical={(props) => (
          <div {...props} className="scrollbar-track-vertical"/>
        )}
      >
        <ul className="tags-wrap" ref={tagListContainer}>
          {tagList.map((tag) => (
            <li key={tag.path}>
              <Tag
                onClose={handleClose.bind(null, tag)}
                closable={tag.path !== "/dashboard"}
                color={currentPath === tag.path ? "orange" : "lime"}
                onClick={handleClick.bind(null, tag.path)}
                onContextMenu={openContextMenu.bind(null, tag)}
              >
                {tag.title}
              </Tag>
            </li>
          ))}
        </ul>
      </Scrollbars>
      {menuVisible ? (
        <ul
          className="contextmenu"
          style={{left: `${left}px`, top: `${top}px`}}
          ref={contextMenuContainer}
        >
          <li onClick={handleCloseOtherTags}>关闭其他</li>
          <li onClick={handleCloseAllTags}>关闭所有</li>
        </ul>
      ) : null}
    </>
  )
}

export default connect((state) => state.tagsView, {
  deleteTags,
  emptyTagList,
  closeOtherTags
})(TagList);
