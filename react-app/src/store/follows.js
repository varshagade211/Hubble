const LOAD_FOLLOWINGS= 'following/LOAD';
const LOAD_FOLLOWERS = 'follower/LOAD';
const DELETE_FOLLOWING= 'following/DELETE';
const ADD_FOLLOWING= 'following/ADD';


const loadFollowings = (followings) => ({
    type: LOAD_FOLLOWINGS,
    followings
})

const loadFollowers= (followers) => ({
    type: LOAD_FOLLOWERS,
    followers
})

const deleteFollowing = (followings) => ({
    type: DELETE_FOLLOWING,
    followings
})

const addFollowing = (followings) => ({
    type: ADD_FOLLOWING,
    followings
})


export const getUserFollowing= (id) => async dispatch => {
    const response = await fetch(`/api/users/${id}/followings`);
    if (response.ok) {
        const data = await response.json();
        // console.log('data from backend before dispatch---', data)
        dispatch(loadFollowings(data.followings));
        return response;
    }
}


export const getUserFollowers= (id) => async dispatch => {
    const response = await fetch(`/api/users/${id}/followers`);
    if (response.ok) {
        const data = await response.json();
 
        dispatch(loadFollowers(data.followers));
        return response;
    }
}

export const removeFollowing = (userId, removeId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/followings/${removeId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
 
        dispatch(deleteFollowing(data.followings));
        return response;
    }
}

export const addFollowingThunk = (userId, newfollowId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/followings/${newfollowId}`, {
        method: 'PUT'
    });
    if (response.ok) {
        const data = await response.json();
        console.log("data from thunk--------- ", data)
        dispatch(addFollowing(data.followings));
        return response;
    }
}

const initialState = { followings: [], followers: []}
const followsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_FOLLOWINGS:  
           
            newState = {...state, followings:[...action?.followings], followers:[...state?.followers]}
            action?.followings?.forEach(user => {
                // console.log('inside reducer, user ---', user)
                // newState.followings.push(user)
                // newState.followings[user.id] = user
                newState[user?.id] = user
            })
            return newState;


        case LOAD_FOLLOWERS:  
            newState = {...state, followings:[...state?.followings], followers:[...action?.followers]}
            
            action?.followers?.forEach(user => {
                // newState.followers.push(user)
                newState[user?.id] = user
            })
            return newState;

        case DELETE_FOLLOWING:  
            
            newState = {...state, followings:[...action?.followings], followers:[...state?.followers]}
            
            action?.followers?.forEach(user => {
                
                newState[user.id] = user
            })
            return newState;

        case ADD_FOLLOWING:  
            console.log("action?.followings-------", action?.followings)
            newState = {...state, followings:[...action?.followings], followers:[...state?.followers]}
            
            action?.followers?.forEach(user => {
                
                newState[user.id] = user
            })
            return newState;


            default:
                return state;
        }
}

export default followsReducer;