import {allPostThunkCreator} from '../store/post'
import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Post from './posts/Post'
import { NavLink } from 'react-router-dom'
import CreatePostModal from './posts/CreatePostModal'
import './Feed.css'

function Feed(){
    const dispatch = useDispatch()
    const posts = useSelector(state => state?.post?.posts)
    const user_id = useSelector(state => state?.session?.user?.id)

    useEffect(()=>{
        (async()=>{
            await dispatch(allPostThunkCreator())

        })();
    },[dispatch]);

   console.log(posts)

    return(
        <div className='feedContainerWraper'>
        <div className='feedContaner'>
          <div>
            <div className='createPostIconConainer'>
                <div className='createPostIcon'>
                    <CreatePostModal type={'text'}/>
                </div>
                <div  className='createPostIcon'>
                    <CreatePostModal type={'image'}/>
                </div>
                <div  className='createPostIcon'>
                    <CreatePostModal type={'link'}/>
                </div>
                <div  className='createPostIcon'>
                    <CreatePostModal type={'quote'}/>
                </div>
                <div  className='createPostIcon'>
                    <CreatePostModal type={'chat'}/>
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
                      <Post post={post}/>
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
                      <NavLink className={'postBtn'} to={''}> <i class="fa-solid fa-heart postIcon"></i>Likes</NavLink>
                      <hr></hr>
                      <NavLink className={'postBtn'} to={`/user/${user_id}/followings`}> <i class="fa-solid fa-users postIcon"></i>Follow user</NavLink>
                      <hr></hr>
                </div>
                <div className='suggestedFollower'>
                    suggested followers will go here
                </div>

        </div>
        </div>
    </div>
    )
}


export default Feed
