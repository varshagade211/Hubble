import {userPostThunkCreator} from '../../store/post'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import CreatePostModal from './CreatePostModal'

import Post from './Post'
import './UserPost.css'

import SideBar from '../SideBar'

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
                <div className="postUserImage">
                    {user?.profileImage ? <img className='userImage' src={user?.profileImage} />
                    :<i className ="fa-solid fa-user-astronaut userProfileLogo"></i>}
                </div>
                <div className="postUserName">
                    <p className='userName'>{user?.username}</p>
                </div>
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
                        {userPosts?.map((post)=>{  return <Post post={post}/>})}
                    </div>
                </div>
                <SideBar />
            </div>

        </div>

    )
}

export default UserPosts
