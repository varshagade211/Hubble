import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getUserFollowing} from '../../store/follows';
import './followinglist.css';
import ManageFollowings from './managefollowngs';
import SideBar from '../SideBar';




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
        <div className='following-list-container'>
            <div className="following-list">
                <div className="following-list-title"> {followings?.length} Following</div>
                <div className="following-list-bar-container">

                 {
                    isloaded  &&
                     followings?.map(user =>(
                        <div key={user?.id}>
                         <ManageFollowings key={user?.id} user={user}/>
                         </div>
                     ))

                 }
                </div>

            </div>
            <div className="userSideBar follows">
            <SideBar />
        </div>

        </div>
    )
}

export default FollowingList
