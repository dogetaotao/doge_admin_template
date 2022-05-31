import * as types from "../action-types";

export const toggleSideBar = () => {
  return {
    type: types.APP_TOGGLE_SIDEBAR
  }
}

export const toggleSettingPanel = () => {
  return {
    type: types.APP_TOGGLE_SETTINGPANEL
  }
}
