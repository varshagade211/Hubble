import {allPostThunkCreator} from '../store/post'
import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Post from './posts/Post'
import { NavLink } from 'react-router-dom'
import CreatePostModal from './posts/CreatePostModal'
import './Feed.css'
import SuggestedUsers from './follows/unfollowedlist'
import {getUnfollowed} from '../store/follows'

function Feed(){
    const dispatch = useDispatch()
    const posts = useSelector(state => state?.post?.posts)
    const user = useSelector(state => state?.session?.user)
    const unfollowedList = useSelector(state => state?.follows?.unfollowed)
    
    
    let unfollowidList= unfollowedList.map(user => user.id)
   

    useEffect(()=>{
        (async()=>{
            await dispatch(allPostThunkCreator())
                dispatch(getUnfollowed(user.id))

        })();
    },[dispatch]);



    return(
        <div className='feedContainerWraper'>
        <div className='feedContaner'>
          <div>
            <div className='createIconAndImageContainer'>
            <div className='feedUserProfileImageContainer'>
            {user?.profileImage ? <img className='feedUserProfileImage' src={user?.profileImage} />
                        :<i className ="fa-solid fa-user-astronaut userProfileLogo"></i>}

            </div>

            <div className='createPostIconConainer'>
                <div className='createPostIcon'>
                    <CreatePostModal type={'text'}/>
                    <p> Text </p>
                </div>
                <div  className='createPostIcon'>
                    <CreatePostModal type={'image'}/>
                    <p> Image </p>
                </div>
                <div  className='createPostIcon'>
                    <CreatePostModal type={'link'}/>
                    <p>Link </p>
                </div>
                <div  className='createPostIcon'>
                    <CreatePostModal type={'quote'}/>
                    <p>Quote</p>
                </div>
                <div  className='createPostIcon'>
                    <CreatePostModal type={'chat'}/>
                    <p> Chat </p>
                </div>
            </div>
            </div>
            <div className='allFeedPostContainer'>
                {posts.map((post)=>{
                   return (
                    <div className="feedPostProfileImgConatiner">
                    <div className="profileImageContainer">
                        {post?.user?.profileImage ? <img className='feedProfileImage' src={post?.user?.profileImage} />
                        :<i className ="fa-solid fa-user-astronaut defaultProfileLogo"></i>}
                    </div>
                    <div>
                      <Post post={post} unfollowList={unfollowidList}/>
                    </div>


                   </div>
                   )
                })}

            </div>
        </div>
        <div className='sideBar'>

                <div className='postNavLink'>
                      <NavLink className={'postBtn'} to={'/user/posts'}> <i className="fa-brands fa-blogger postIcon"></i> Post</NavLink>
                      <hr></hr>
                      <NavLink className={'postBtn'} to={'/user/likes'}> <i class="fa-solid fa-heart postIcon"></i>Likes</NavLink>
                      <hr></hr>
                      <NavLink className={'postBtn'} to={`/user/${user?.id}/followings`}> <i class="fa-solid fa-users postIcon"></i>Following </NavLink>
                      <hr></hr>
                      <NavLink className={'postBtn'} to={`/user/${user?.id}/followers`}> <i class="fa-solid fa-users postIcon"></i>Follower</NavLink>
                      <hr></hr>
                </div>
                <div className='suggestedFollower'>
                    <SuggestedUsers />
                </div>

        </div>
        </div>
    </div>
    )
}


export default Feed