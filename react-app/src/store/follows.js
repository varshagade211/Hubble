const LOAD_FOLLOWINGS= 'following/LOAD';
const LOAD_FOLLOWERS = 'follower/LOAD';


const loadFollowings = (followings) => ({
    type: LOAD_FOLLOWINGS,
    followings
})

const loadFollowers= (followers) => ({
    type: LOAD_FOLLOWERS,
    followers
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

const initialState = { followings: [], followers: []}
const followsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_FOLLOWINGS:  
           
            newState = {...state}
            action?.followings?.forEach(user => {
                console.log('inside reducer, user ---', user)
                newState.followings.push(user)
            })
            return newState;


        case LOAD_FOLLOWERS:  
            newState = {...state} 
            
            action.followers?.forEach(user => {
                newState.followers.push(user)
            })
            return newState;


            default:
                return state;
        }
}

export default followsReducer;