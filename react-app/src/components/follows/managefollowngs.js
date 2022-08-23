import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from 'react-router-dom'
import {removeFollowing, addFollowingThunk } from '../../store/follows'



const ManageFollowings = (user) => {
    console.log("in ManageFollowings user state passed in ----", user)
    const[isfollow , setIsFollow] = useState(true)
    const dispatch = useDispatch();
    const {id} = useParams()
    console.log("77777------", id)
    let list_user = user.user

    const unfollowHandler = async(e) =>{
        e.preventDefault();
        if( isfollow ) {
            dispatch(removeFollowing(id, list_user.id ))
        } 

        setIsFollow((prev) => !prev)
        
     }


    return (
        <div className="listed-user-bar">

            <Link key={user.id} to={`/user/${list_user.id}/posts`}>{list_user.username}</Link> 
            <span className="unfollow-btn">
                <button onClick={unfollowHandler}>{isfollow?"Unfollow":"Follow"}</button>
            </span>
        </div>
        )
}

export default ManageFollowings