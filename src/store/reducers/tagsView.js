import * as types from "../action-types"

const initState = {
  tagList: []
}

export default function app(state = initState, action) {
  switch (action.type) {
    case types.TAGSVIEW_ADD_TAG:
      const tag = action.tag
      if(state.tagList.includes(tag)) {
        return state
      } else {
        return {
          ...state,
          tagList: [...state.tagList, tag]
        }
      }
    case types.TAGSVIEW_DELETE_TAG:
      return {
        ...state,
        tagList: [...state.tagList.filter((item) => item !== action.tag)]
      }
    case types.TAGSVIEW_EMPTY_TAGLIST:
      return {
        ...state,
        tagList: [
          ...state.tagList.filter((item) => item.path === "/dashboard")
        ]
      }
    case types.TAGSVIEW_CLOSE_OTHER_TAGS:
      return {
        ...state,
        tagList: [
          ...state.tagList.filter((item) => item.path === "/dashboard" || item === action.tag)
        ]
      }
    default:
      return state
  }
}
