import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from 'react-router-dom'
import {removeFollowing, addUnfollowed} from '../../store/follows'



const ManageFollowings = (user) => {
   

    const dispatch = useDispatch();
    const {id} = useParams()

    let list_user = user.user

    const unfollowHandler = async(e) =>{
        e.preventDefault();

            dispatch(removeFollowing(id, list_user.id ))
            dispatch(addUnfollowed(list_user))


     }
    return (
        <div className="listed-user-bar">

            <Link key={user.id} to={`/user/${list_user.id}/posts`}>{list_user.username}</Link>
            <span className="unfollow-btn">
                <button onClick={unfollowHandler}>Unfollow</button>
            </span>
        </div>
        )
}

export default ManageFollowings
