import * as types from './constants'

export function addComment(comment) {
    return {
      type: types.ADD_COMMENT,
      comment
    }
  }
  
  export function removeComment(key) {
    return {
      type: types.REMOVE_COMMENT,
      key
    }
  }
  
  
  export function updateName(name) {
    return {
      type: types.UPDATE_NAME,
      name
    }
  }
  
  
  export function updateEmail(email) {
    return {
      type: types.UPDATE_EMAIL,
      email
    }
  }