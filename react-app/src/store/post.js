
const GET_ALL_POSTS = 'posts/GET_ALL_POSTS';
const GET_ALL_USER_POST = 'posts/GET_ALL_USER_POST'
const DELETE_POST = 'posts/DELETE_POST'
const CREATE_POST = 'posts/CREATE_POST'
const EDIT_POST = 'post/EDIT_POST'
const GET_ALL_LIKED_POSTS = 'posts/GET_ALL_LIKED_POSTS'
// ---------------------------------------------action creator-----------------------------------
const getPosts = (posts) => {
   return{
    type: GET_ALL_POSTS ,
    posts
   }
  };

const getUserPost = (userPosts)=>{
   return{
    type:GET_ALL_USER_POST,
    userPosts
   }
}
const deleteUserPost = (postId)=>{
  return{
   type:DELETE_POST,
   postId
  }
}

const createPost = (post) =>{
  return{
    type:CREATE_POST,
    post
  }
}

const editPost = (post) => {
  return{
    type:EDIT_POST,
    post
  }
}

const getAllLikedPosts = (likedPosts) => {
  return{
    type:GET_ALL_LIKED_POSTS,
    likedPosts
  }
}
// --------------------------------------------thunk action creator---------------------------------------
 export const allPostThunkCreator = () => async(dispatch) => {
    const response = await fetch('/api/posts/', {
        headers: {}
      });
    const posts = await response.json()
    dispatch(getPosts(posts.posts))
}

export const userPostThunkCreator = () => async(dispatch) => {
  const response = await fetch('/api/posts/user/posts', {
      headers: {}
    });
  const posts = await response.json()
  dispatch(getUserPost(posts.posts))
}

export const deletePostThunk = (postId) => async (dispatch) => {

  const response = await fetch(`/api/posts/user/post/${postId}`,{
      method:'DELETE',

  })
  const message = await response.json()
  dispatch(deleteUserPost(postId))

  return response
}

export const createPostThunkCreator = (post) => async (dispatch) => {
  console.log('from thunk...........', post)
  const response = await fetch('/api/posts/user/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title : post.title,
      description:post.description,
      type:post.type,
      link:post.link,
      image:post.image
    }),

  });


  if (response.ok) {
    const data = await response.json();
    dispatch(createPost(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const editPostThunkCreator = (post) => async (dispatch) => {
  console.log('from edit thunk...........', post)
  const response = await fetch(`/api/posts//user/post/${post.postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title : post.title,
      description:post.description,
      type:post.type,
      link:post.link,
      image:post.image
    }),

  });


  if (response.ok) {
    const data = await response.json();
    dispatch(editPost(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

  export const getAllLikedThunkCreator = (id) => async(dispatch) => {
    const response = await fetch(`/api/users/${id}/likes`, {
       headers: {}
    });
    const posts = await response.json()
    // console.log('in like thunk.....', posts.likes)
     dispatch(getAllLikedPosts(posts.likes))
  }

// ----------------------------------------reducer----------------------------------------------------

const initialState = { posts: [] , userPosts:[] , likedPosts:[]}
export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
      case GET_ALL_POSTS:{
        newState= {...state, posts:[...action?.posts], userPosts:[...state?.userPosts], likedPosts:[...state?.likedPosts]}
        action?.posts?.forEach((post)=>{
          newState[post.id] = post
        })
        return newState
      }
      case GET_ALL_USER_POST:{
        newState= {...state, posts:[...state?.posts],userPosts:[...action?.userPosts],likedPosts:[...state?.likedPosts]}

        return newState
      }
      case DELETE_POST:{
        delete state?.action?.postId
        let newPosts = state?.posts?.filter((post) => post?.id !== action?.postId)
        let newUserPosts = state?.userPosts?.filter((post) => post?.id !== action?.postId)
        let newLikedPosts = state?.userLikedPosts?.filter((post) => post?.id !== action?.postId)
        newState = {...state, posts:newPosts,userPosts:newUserPosts,likedPosts:newLikedPosts}
        return newState
      }
      case CREATE_POST:{
        newState = {...state,posts:[...state?.posts, action?.post],userPosts:[...state?.userPosts, action?.post],likedPosts:[...state?.likedPosts]}
        newState[action?.post?.id] =action?.post
        return newState
      }
      case EDIT_POST:{
        state?.posts?.forEach((post,i) => {
          if(post?.id === action?.post?.id)  {

            state?.posts.splice(i, 1, action?.post)

          }
        })
        state?.userPosts?.forEach((post,i) => {
          if(post?.id === action?.post?.id)  {

            state?.userPosts?.splice(i, 1, action?.post)

          }
        } )
        state[action?.post?.id] = action?.post
        newState = {...state, posts:[...state?.posts], userPosts:[...state?.userPosts],likedPosts:[...state?.likedPosts]}
        return newState
      }
      case GET_ALL_LIKED_POSTS:{
        // console.log(action?.likes)
        newState= {...state, posts:[...state?.posts], userPosts:[...state?.userPosts], likedPosts:[...action?.likedPosts]}
        return newState
      }
      default:{
        return state;
      }
    }
  }
