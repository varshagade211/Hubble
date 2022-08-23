import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {getUserFollowing} from '../../store/follows'
import './followinglist.css'





function FollowingList() {
    const {id} = useParams()
    const dispatch = useDispatch();
    const [isloaded, setIsloaded] = useState(false);
    const followings = useSelector(state => Object.values(state.follows.followings));
    
    
    useEffect(()=>{
        dispatch(getUserFollowing(id)).then(() => setIsloaded(true))
    },[dispatch, id])
    console.log("followings to render -----", followings)
    return (
        <div class='following-list-container'>
            <div className="following-list">
                <div className="following-list-title"> {followings.length} Following</div>
                 {
                    isloaded  && 
                     followings.map(user =>(
                         <div key={user.id} className="following-users" >{user.username}</div>
                     ))
                }                    
            </div>
        </div>
    )
}

export default FollowingList


