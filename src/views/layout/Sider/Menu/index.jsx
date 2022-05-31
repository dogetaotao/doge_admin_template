import React, {useEffect, useLayoutEffect, useState} from "react";
import {Menu} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {Scrollbars} from "react-custom-scrollbars";
import {connect} from "react-redux";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {addTags} from "../../../../store/actions";
import {getMenuItemInMenuListByProperty} from "../../../../utils";
import menuList from "../../../../config/menuConfig";
import store from "../../../../store";
import "./index.less";
import useComponentWillMount from "../../../../hooks/useComponentWillMount";


/**
 * 重新记录数组顺序
 * @param list
 * @param startIndex
 * @param endIndex
 * @returns {unknown[]}
 */
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const SideMenu = (props) => {

  const [openKey, setOpenKey] = useState([])
  const navigate = useNavigate()
  const path = useLocation().pathname
  const {role,token} = props

  const filterMenuItem = (item) => {
    //token的更新快于useInfo的更新，故采用此方法
    // const role = token.split("-")[0]
    const {roles} = item
    if (!roles || roles.includes(role)) {
      return true
    } else if (item.children) {
      // 如果当前用户有此item的某个子item的权限
      return !!item.children.find((child) => roles.includes(child.role))
    }
    return false
  }
  //得到需要的请求路由路径
  const getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (filterMenuItem(item)) {
        if (!item.children) {
          pre = [...pre,
            {
              key: item.path,
              onClick: () => {
                navigate(item.path)
              },
              label: item.title,
              icon: item.icon,
            }]
        } else {
          const cItem = item.children.find(
            (cItem) => path.indexOf(cItem.path) === 0
          )
          if (cItem) {
            setOpenKey([...openKey, item.path])
          }
          pre = [...pre,
            {
              key: item.path,
              label: item.title,
              icon: item.icon,
              children: getMenuNodes(item.children)
            }
          ]
        }
      }
      return pre
    }, [])
  }

  const [menuTreeNode, setMenuTreeNode] = useState(null)

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const _items = reorder(
      menuTreeNode,
      result.source.index,
      result.destination.index
    )
    setMenuTreeNode(_items)
  }

  const handleMenuSelect = ({key = "/dashboard"}) => {
    let menuItem = getMenuItemInMenuListByProperty(menuList, "path", key)
    store.dispatch(addTags(menuItem))
  }

  useComponentWillMount(() => {
    setMenuTreeNode(getMenuNodes(menuList))
    handleMenuSelect(openKey)
  })

  useLayoutEffect(() => {
    setMenuTreeNode(getMenuNodes(menuList))
  }, [props.role])

  return (
    <div className="sidebar-menu-container">
      <Scrollbars autoHide autoHideDuration={200} autoHideTimeout={1000}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {
              (provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <span style={{display: "none"}}>{provided.placeholder}</span>
                  {menuTreeNode.map((item, index) => {
                    return (
                      <Draggable
                        key={item.key}
                        draggableId={item.key}
                        index={index}
                        draggable={true}
                      >
                        {
                          (provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <span style={{display: "none"}}>{provided.placeholder}</span>
                              <Menu
                                mode="inline"
                                theme="dark"
                                onSelect={handleMenuSelect}
                                selectedKeys={[path]}
                                defaultOpenKeys={openKey}
                                items={[item]}
                                style={{userSelect: "none"}}
                              />
                            </div>
                          )
                        }
                      </Draggable>
                    )
                  })}
                </div>
              )
            }
          </Droppable>
        </DragDropContext>
      </Scrollbars>
    </div>
  )
}

export default connect((state) => {return {...state.user, ...state.tagsView}}, {addTags, menuList})(SideMenu)



