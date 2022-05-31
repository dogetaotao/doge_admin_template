import {logout, login} from "./auth"
import {getUserInfo, setUserInfo, setUserToken, resetUser} from "./user";
import {changeSetting} from "./setting"
import {toggleSettingPanel, toggleSideBar} from "./apps"
import {addTags, deleteTags, closeOtherTags, emptyTagList} from "./tagsView"

export {
  login,
  logout,
  getUserInfo,
  setUserInfo,
  setUserToken,
  resetUser,
  changeSetting,
  toggleSideBar,
  toggleSettingPanel,
  addTags,
  deleteTags,
  closeOtherTags,
  emptyTagList,
}
