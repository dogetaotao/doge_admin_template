import {combineReducers} from "redux";
import user from "./user"
import apps from "./apps";
import setting from "./setting";
import tagsView from "./tagsView";

export default combineReducers({
  user,
  apps,
  setting,
  tagsView,
})
