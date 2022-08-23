import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from 'react-router-dom'



const ManageFollowings = (user, currentid) => {
    console.log("in ManageFollowings user state passed in ----", user)
    const[isfollow , setIsFollow] = useState(false)
        
    let list_user = user.user

    const followHandler = async() =>{
        
        setIsFollow((prev) => !prev)
        // follow dispatch will be here
     }


    return (
        <div className="listed-user-bar">

            <Link key={user.id} to={`/users/${list_user.id}/posts`}>{list_user.username}</Link> 
            <span className="unfollow-btn">
                <button onClick={followHandler}>{isfollow?"Follow":"Unfollow"}</button>
            </span>
        </div>
        )
}

export default ManageFollowings