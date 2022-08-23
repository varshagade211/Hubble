
import {getAllLikedThunkCreator} from '../../store/post'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import { NavLink } from 'react-router-dom'
import Post from './Post'
import './UserPost.css'


function LikedPosts(){
    const dispatch = useDispatch()

    const likedPosts= useSelector( state => state?.post?.likedPosts)
    const user = useSelector(state => state?.session?.user)
    useEffect(()=>{
        dispatch(getAllLikedThunkCreator(user?.id))
    },[dispatch])

   console.log('in likepost componenet',likedPosts)

    return(
    <div className='userPostContainerWraper'>

        <div className='postIconContainer'>
             <div>

                <div className='allFeedPostContainer'>
                {likedPosts.map((post)=>{
                   return (
                    <div className="feedPostProfileImgConatiner">
                    <div className="profileImageContainer">
                        {post?.user?.profileImage ? <img className='feedProfileImage' src={post?.user?.profileImage} />
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
            <div className='userSideBar'>
                <div className='userPostNavLink'>
                <div className='postNavLink'>
                      <NavLink className={'postBtn'} to={'/user/posts'}> <i className="fa-brands fa-blogger postIcon"></i> Post</NavLink>
                      <hr></hr>
                      <NavLink className={'postBtn'} to={'/user/likes'}> <i class="fa-solid fa-heart postIcon"></i>Likes</NavLink>
                      <hr></hr>
                      <NavLink className={'postBtn'} to={''}> <i class="fa-solid fa-users postIcon"></i>Follow user</NavLink>
                      <hr></hr>
                </div>
                </div>
                <div className='suggestedUserFollower'>
                    suggested followers will go here
                </div>
            </div>
        </div>
    </div>
    )
}

export default LikedPosts
