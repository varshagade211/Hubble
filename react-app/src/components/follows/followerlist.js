import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {getUserFollowers} from '../../store/follows'

function FollowerList() {
    const {id} = useParams()
    const dispatch = useDispatch();
    const [isloaded, setIsloaded] = useState(false);
    const followers = useSelector(state => Object.values(state.follows.followers));
    
    
    useEffect(()=>{
        dispatch(getUserFollowers(id)).then(() => setIsloaded(true))
    },[dispatch, id])
    console.log("followers to render -----", followers)
    return (
        <div class='following-list-container'>
            <div className="following-list">
                <div className="following-list-title"> {followers.length} Followers</div>
                 {
                    isloaded  && 
                     followers?.map(user =>(
                         <div key={user.id} className="following-users" >{user.username}</div>
                     ))
                }                    
            </div>
        </div>
    )
}

export default FollowerList