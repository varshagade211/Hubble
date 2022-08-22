import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';






function ManageFollowings() {
    const {id} = useParams()
    const dispatch = useDispatch();
    const [isloaded, setIsloaded] = useState(false);
    const followings = useSelector(state => state.follows.followings);
    console.log(followings)
    // const userFollowings = followings.filter(review => review.userId === Number(id));


  return (
    <div className="followings-page-container">
        
        <div className="my-followings">
            <div className="my-reviews-title">My Following Users</div>
           
        </div>



        
    </div>
  )
}

export default ManageFollowings


