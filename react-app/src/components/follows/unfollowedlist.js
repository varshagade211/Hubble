import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {getUnfollowed, addFollowingThunk, updateUnfollowed} from '../../store/follows'

function SuggestedUsers() {
    const {id} = useParams()
    const dispatch = useDispatch();
    // const [isloaded, setIsloaded] = useState(false);
    const suggest_users= useSelector(state => Object.values(state.follows.unfollowed));

    useEffect(()=>{
        
        dispatch(getUnfollowed(id))
    },[dispatch, id])
    
    return (
        <div className='suggest-users-container'>
            <div className='suggest-users-title'>Check Out These Users </div>
            <div className="suggest-users-list">
               
                 {
                    suggest_users  
                    && 
                    suggest_users?.map(user =>(
                         <div key={user.id} className="fsuggest-users" >
                           <Link key={user.id} to={`/users/${user.id}/posts`}>{user.username}</Link>
                           <span>
                            {/* <button className='follow-btn' 
                           onClick={() => {dispatch([addFollowingThunk(current_user.id, user.id),updateUnfollowed(user.id)])
                        }}>Follow</button> */}
                           <FollowClick listeduser={user}/>
                           </span>
                        </div>
                     ))
                }                    
            </div>
        </div>
    )
}

const FollowClick = (listeduser) => {
    // console.log("listeduser--------", listeduser.listeduser.id)
    const dispatch = useDispatch();
    const current_user = useSelector(state => state?.session?.user)


    const handleFollowing = async(e) =>{
        e.preventDefault();
         dispatch(addFollowingThunk(current_user.id, listeduser.listeduser.id))
         dispatch(updateUnfollowed(listeduser.listeduser.id))
    }

    return (
        <>
            <button className="follow-btn" onClick={handleFollowing}>
                Follow
            </button>
        </>
    )


}

export default SuggestedUsers