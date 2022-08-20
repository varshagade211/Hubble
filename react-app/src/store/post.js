
const GET_ALL_POSTS = 'posts/GET_ALL_POSTS';
const GET_ALL_USER_POST = 'posts/GET_ALL_USER_POST'
const DELETE_POST = 'posts/DELETE_POST'

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

export const deletePostThunk = (post) => async (dispatch) => {
  const {id} = post
  const response = await fetch(`/api/posts/user/post/${id}`,{
      method:'DELETE',

  })
  const spotData = await response.json()
  dispatch(deleteUserPost(id))

  return response
}


const initialState = { posts: [] , userPosts:[]}
export default function reducer(state = initialState, action) {

    switch (action.type) {
      case GET_ALL_POSTS:{
        return { posts:action?.posts}
      }
      case GET_ALL_USER_POST:{
        return {...state,posts:[...state?.posts],userPosts:[...action?.userPosts]}
      }
      case DELETE_POST:{


      }
      default:{
        return state;
      }
    }
  }
