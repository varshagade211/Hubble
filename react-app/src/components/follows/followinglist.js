import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {getUserFollowing} from '../../store/follows'
import './followinglist.css'
import ManageFollowings from './managefollowngs';




function FollowingList() {
    const {id} = useParams()
    const dispatch = useDispatch();
    const [isloaded, setIsloaded] = useState(false);
    const followings = useSelector(state => Object.values(state.follows.followings));
    
    // const posts = useSelector(state => state?.post?.posts)
    // console.log("1111111--------", posts)
    
    
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
                     followings?.map(user =>(
                        <div key={user.id}>
                         <ManageFollowings key={user.id} user={user} currentid={id}/>
                         </div>
                     )
                        
                     
                         
                            /* <Link key={user.id} to={`/users/${user.id}/posts`}>{user.username}</Link> */
                            
                                // <button className="followBtn" onClick={followHandler}>{isfollow?"Follow":"Unfollow"}</button>
                     )
               
                 }                    
            </div>
        </div>
    )
}

export default FollowingList


