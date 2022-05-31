import React from 'react';
import {Breadcrumb} from "antd";
import menuList from "../../config/menuConfig"
import {useLocation} from "react-router-dom";
import "./index.less"

/**
 * 递归得到面包屑要显示的节点
 * @param menuList
 * @param pathName
 * @returns {*[]}
 */
const getPath = (menuList, pathName) => {
  let temp = []
  try {
    function getNodePath(node) {
      temp.push(node)
      //找到合适节点，通过throw错误终止递归
      if (node.path === pathName) {
        throw new Error("GOT IT！")
      }
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i])
        }
        //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        temp.pop()
      } else {
        //找到叶子节点时，删除路径当中的该叶子节点
        temp.pop()
      }
    }

    for (let i = 0; i < menuList.length; i++) {
      getNodePath(menuList[i])
    }
  } catch (e) {
    return temp
  }
}

const BreadCrumb = () => {
  const location = useLocation()
  const {pathname} = location
  let path = getPath(menuList, pathname)
  const first = path && path[0]
  if (first && first.title.trim() !== "首页") {
    path = [{title: "首页", path: "/dashboard"}].concat(path)
  }

  return (
    <div  className="Breadcrumb-container">
      <Breadcrumb>
        {
          path &&
          path.map((item) => {
            return item.title === "首页" ? (<Breadcrumb.Item key={item.path}>
              <a href={`#${item.path}`}>{item.title}</a>
            </Breadcrumb.Item>) : (<Breadcrumb.Item key={item.path}>
              {item.title}
            </Breadcrumb.Item>)
          })
        }
      </Breadcrumb>
    </div>
  )
}

export default BreadCrumb;
