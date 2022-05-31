/**
 * 根据某个属性值，从menuList查找用有该属性的menuItem，使用队列的dfs查找
 * @param menuList
 * @param key
 * @param value
 * @returns {T}
 */

export const getMenuItemInMenuListByProperty = (menuList, key, value) => {
  let stack = []
  stack = stack.concat(menuList)
  let res
  while(stack.length) {
    let cur = stack.shift()
    if(cur.children && cur.children.length > 0) {
      stack = cur.children.concat(stack)
    }
    if(value === cur[key]) {
      res = cur
    }
  }
  return res
}
