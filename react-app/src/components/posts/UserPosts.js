import {userPostThunkCreator} from '../../store/post'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import CreatePostModal from './CreatePostModal'
import { NavLink } from 'react-router-dom'
import Post from './Post'
import './UserPost.css'


function UserPosts(){
    const dispatch = useDispatch()
    const userPosts= useSelector( state => state?.post?.userPosts)
    const user = useSelector(state => state?.session?.user)
    useEffect(()=>{
        dispatch(userPostThunkCreator())
    },[dispatch])



    return(
    <div className='userPostContainerWraper'>
      <div className='userImageContainer'>
      {user?.profileImage ? <img className='userImage' src={user?.profileImage} />
                        :<i className ="fa-solid fa-user-astronaut userProfileLogo"></i>}

        <p className='userName'>{user?.username}</p>
     </div>
        <div className='postIconContainer'>
          <div>
            <div className='createUserPostIconConainer'>
                <div className='createUserPostIcon'>
                    <CreatePostModal type={'text'}/>
                    <p> Text </p>

                </div>

                <div  className='createUserPostIcon'>
                    <CreatePostModal type={'image'}/>
                    <p> Image </p>


                </div>

                <div  className='createUserPostIcon'>
                    <CreatePostModal type={'link'}/>
                    <p>Link </p>

                </div>

                <div  className='createUserPostIcon'>
                    <CreatePostModal type={'quote'}/>
                    <p>Quote</p>

                </div>
                <div  className='createUserPostIcon'>
                    <CreatePostModal type={'chat'}/>
                    <p> Chat </p>

                </div>


            </div>
        <div className='userPostContainer'>

            {userPosts.map((post)=>{
                return <Post post={post}/>
            })}
        </div>
        </div>
        <div className='userSideBar'>
            <div className='userPostNavLink'>

                      <NavLink className={'postBtn'} to={'/user/posts'}> <i className="fa-brands fa-blogger postIcon"></i> Post</NavLink>
                      <hr></hr>
                      <NavLink className={'postBtn'} to={'/user/likes'}> <i class="fa-solid fa-heart postIcon"></i>Likes</NavLink>
                      <hr></hr>
                      <NavLink className={'postBtn'} to={`/user/${user?.id}/followings`}> <i class="fa-solid fa-users postIcon"></i>Following </NavLink>
                      <hr></hr>
                      <NavLink className={'postBtn'} to={`/user/${user?.id}/followers`}> <i class="fa-solid fa-users postIcon"></i>Follower </NavLink>
                      <hr></hr>

            </div>
            <div className='suggestedUserFollower'>
                suggested followers will go here
            </div>

        </div>
        </div>
    </div>
    )
}

export default UserPosts
