import * as types from "../action-types"

export const addTags = (tag) => {
  return {
    type: types.TAGSVIEW_ADD_TAG,
    tag,
  }
}

export const emptyTagList = () => {
  return {
    type: types.TAGSVIEW_EMPTY_TAGLIST
  }
}

export const deleteTags = (tag) => {
  return {
    type: types.TAGSVIEW_DELETE_TAG,
    tag,
  }
}

export const closeOtherTags = (tag) => {
  return {
    type: types.TAGSVIEW_CLOSE_OTHER_TAGS,
    tag,
  }
}
