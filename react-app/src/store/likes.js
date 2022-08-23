
const GET_USER_LIKED_POST = 'likes/GET_USER_LIKED_POST';
const CREATE_LIKE = 'likes/CREATE_LIKE'
const DELETE_LIKE = 'likes/DELETE_LIKE'


//----------------------action creator-------------------------------------------


const getAllUsersLikes = (usersLikes) => {
  return {
    type: GET_USER_LIKED_POST,
    usersLikes
  }
}

const createLike = (like) => {
  return {
    type: CREATE_LIKE,
    like
  }
}

const deleteLike = () => {
  return {
    type: CREATE_LIKE,
    like
  }
}


//----------------------thunk action creator---------------------------------------






//----------------------------reducer----------------------------------------------



const initialState = { usersLikes: [], postsLikes: [] }

export default function likesReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}