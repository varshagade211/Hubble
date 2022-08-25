import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {getUserFollowing} from '../../store/follows'
import './followinglist.css'
import ManageFollowings from './managefollowngs';
import SuggestedUsers from './unfollowedlist'




function FollowingList() {
    const {id} = useParams()
    const dispatch = useDispatch();
    const [isloaded, setIsloaded] = useState(false);
    const followings = useSelector(state => Object.values(state.follows.followings));


    useEffect(()=>{
        dispatch(getUserFollowing(id)).then(() => setIsloaded(true))
    },[dispatch, id])
  
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
            <div className="suggest-user-container">
                <SuggestedUsers />
            </div>
        </div>
    )
}

export default FollowingList
