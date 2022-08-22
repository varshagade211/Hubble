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

//    console.log(user)

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

                </div>

                <div  className='createUserPostIcon'>
                    <CreatePostModal type={'image'}/>


                </div>

                <div  className='createUserPostIcon'>
                    <CreatePostModal type={'link'}/>

                </div>

                <div  className='createUserPostIcon'>
                    <CreatePostModal type={'quote'}/>

                </div>
                <div  className='createUserPostIcon'>
                    <CreatePostModal type={'chat'}/>

                </div>


            </div>
        <div>

            {userPosts.map((post)=>{
                return <Post post={post}/>
            })}
        </div>
        </div>
        <div className='userSideBar'>

                <div className='userPostNavLink'>
                      <NavLink className={'userPostIcon'} to={'/user/posts'}> <i className="fa-brands fa-blogger postIcon"></i> Posts</NavLink>
                      <hr></hr>
                      <p className={'userPostIcon'} >Nav link for liked post page</p>
                      <hr></hr>
                      <p className={'userPostIcon'}> Nav link for followed user page</p>
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
