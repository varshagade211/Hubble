import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {getUserFollowing} from '../../store/follows';
import './followinglist.css';
import ManageFollowings from './managefollowngs';
import SuggestedUsers from './unfollowedlist';
import { NavLink } from "react-router-dom";




function FollowingList() {
    // const {id} = useParams()
    const dispatch = useDispatch();
    const [isloaded, setIsloaded] = useState(false);
    const followings = useSelector(state => Object.values(state.follows.followings));
    const user = useSelector((state) => state?.session?.user);

    useEffect(()=>{
        dispatch(getUserFollowing(user.id)).then(() => setIsloaded(true))
    },[dispatch, user.id])
  
    return (
        <div class='following-list-container'>
            <div className="following-list">
                <div className="following-list-title"> {followings.length} Following</div>
                <div className="following-list-bar-container">

                 {
                    isloaded  &&
                     followings?.map(user =>(
                        <div key={user.id}>
                         <ManageFollowings key={user.id} user={user}/>
                         </div>
                     ))

                 }                    
                </div>

            </div>
            <div className="userSideBar follows">
          <div className="userPostNavLink">
            <NavLink className={"postBtn"} to={"/user/posts"}>
              {" "}
              <i className="fa-brands fa-blogger postIcon"></i> Post
            </NavLink>
            <hr></hr>
            <NavLink className={"postBtn"} to={"/user/likes"}>
              {" "}
              <i class="fa-solid fa-heart postIcon"></i>Likes
            </NavLink>
            <hr></hr>
            <NavLink className={"postBtn"} to={`/user/followings`}>
              {" "}
              <i class="fa-solid fa-users postIcon"></i>Following{" "}
            </NavLink>
            <hr></hr>
            <NavLink className={"postBtn"} to={`/user/followers`}>
              {" "}
              <i class="fa-solid fa-users postIcon"></i>Follower{" "}
            </NavLink>
            <hr></hr>
          </div>
          <div className="suggestedUserFollower">
            <SuggestedUsers />
          </div>
        </div>
            
        </div>
    )
}

export default FollowingList
