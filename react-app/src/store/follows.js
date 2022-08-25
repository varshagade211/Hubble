const LOAD_FOLLOWINGS= 'following/LOAD';
const LOAD_FOLLOWERS = 'follower/LOAD';
const LOAD_UNFOLLOWED = ' unfollowed/LOAD';
const DELETE_FOLLOWING= 'following/DELETE';
const ADD_FOLLOWING= 'following/ADD';
const DELETE_UNFOLLOWED= 'unfollowed/DELETE';
const ADD_UNFOLLOWED= 'unfollowed/ADD';


const loadFollowings = (followings) => ({
    type: LOAD_FOLLOWINGS,
    followings
})

const loadFollowers= (followers) => ({
    type: LOAD_FOLLOWERS,
    followers
})

const loadUnfollowed= (unfollowed) => ({
    type: LOAD_UNFOLLOWED,
    unfollowed
})

const deleteFollowing = (followings) => ({
    type: DELETE_FOLLOWING,
    followings
})

const addFollowing = (followings) => ({
    type: ADD_FOLLOWING,
    followings
})

export const updateUnfollowed = (id) => ({
    type: DELETE_UNFOLLOWED,
    id
})

export const addUnfollowed = (user) => ({
    type: ADD_UNFOLLOWED,
    user
})


export const getUserFollowing= (id) => async dispatch => {
    const response = await fetch(`/api/users/${id}/followings`);
    if (response.ok) {
        const data = await response.json();

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
//
export const getUnfollowed= (id) => async dispatch => {
    const response = await fetch(`/api/users/${id}/unfollowed`);
    if (response.ok) {
        const data = await response.json();

        dispatch(loadUnfollowed(data.unfollowed));
        return response;
    }
}
//
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
        dispatch(addFollowing(data.followings));
        return response;
    }
}

const initialState = { followings: [], followers: [], unfollowed: []}
const followsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_FOLLOWINGS:

            newState = {...state, followings:[...action?.followings], followers:[...state?.followers], unfollowed:[...state?.unfollowed] }
            action?.followings?.forEach(user => {


                newState[user?.id] = user
            })
            return newState;


        case LOAD_FOLLOWERS:
            newState = {...state, followings:[...state?.followings], followers:[...action?.followers], unfollowed:[...state?.unfollowed]}

            action?.followers?.forEach(user => {

                newState[user?.id] = user
            })
            return newState;

        case LOAD_UNFOLLOWED:
            newState = {...state, followings:[...state?.followings], followers:[...state?.followers], unfollowed:[...action?.unfollowed]}

            action?.unfollowed?.forEach(user => {

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

            newState = {...state, followings:[...action?.followings], followers:[...state?.followers]}

            action?.followers?.forEach(user => {

                newState[user.id] = user
            })
            return newState;

        case DELETE_UNFOLLOWED:

            let unfollowArr = Object.values(state.unfollowed)

            let updatedArr = unfollowArr.filter(user => user.id !== action.id)
            newState = {...state, followings:[...state?.followings], followers:[...state?.followers], unfollowed:[...updatedArr]}
            return newState;

        case ADD_UNFOLLOWED:

            let unfollow = Object.values(state.unfollowed)

            unfollow.push(action.user)

            newState = {...state, followings:[...state?.followings], followers:[...state?.followers], unfollowed:[...unfollow]}

            return newState;


            default:
                return state;
        }
}

export default followsReducer;
