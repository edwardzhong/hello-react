import { ADD_COMMENT, REMOVE_COMMENT, UPDATE_NAME, UPDATE_EMAIL } from './constants'

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function removeComment(id) {
  return {
    type: REMOVE_COMMENT,
    id
  }
}


export function updateName(name) {
  return {
    type: UPDATE_NAME,
    name
  }
}


export function updateEmail(email) {
  return {
    type: UPDATE_EMAIL,
    email
  }
}