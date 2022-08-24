
import {getAllLikedThunkCreator} from '../../store/post'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import { NavLink } from 'react-router-dom'
import Post from './Post'
import './LikedPosts.css'
import SuggestedUsers from '../follows/unfollowedlist'


function LikedPosts(){
    const dispatch = useDispatch()

    const likedPosts= useSelector( state => state?.post?.likedPosts)
    const user = useSelector(state => state?.session?.user)
    useEffect(()=>{
        dispatch(getAllLikedThunkCreator(user?.id))
    },[dispatch])

   console.log('in likepost componenet',likedPosts)

    return(
    <div className='likedPostContainerWraper'>
        <div className='likedPostContaner'>
             <div>
             <div className='allLikedPostContainer'>
                {likedPosts.map((post)=>{
                   return (
                    <div className="likedPostProfileImgConatiner">
                    <div className="likedProfileImageContainer">
                        {post?.user?.profileImage ? <img className='likedProfileImage' src={post?.user?.profileImage} />
                        :<i className ="fa-solid fa-user-astronaut defaultProfileLogo"></i>}
                    </div>
                    <div>
                      <Post post={post}/>
                    </div>
                   </div>
                   )
                })}
                </div>
            </div>
            <div className='likedSideBar'>
                {/* <div className='userPostNavLink'> */}
                <div className='likePostNavLink'>
                      <NavLink className={'postBtn'} to={'/user/posts'}> <i className="fa-brands fa-blogger postIcon"></i> Post</NavLink>
                      <hr></hr>
                      <NavLink className={'postBtn'} to={'/user/likes'}> <i class="fa-solid fa-heart postIcon"></i>Likes</NavLink>
                      <hr></hr>
                      <NavLink className={'postBtn'} to={''}> <i class="fa-solid fa-users postIcon"></i>Follow user</NavLink>
                      <hr></hr>
                </div>
                {/* </div> */}
                <div className='suggestedUserFollowerOnLikedPage'>
                 <SuggestedUsers />
                </div>
            </div>
        </div>
    </div>
    )
}

export default LikedPosts
