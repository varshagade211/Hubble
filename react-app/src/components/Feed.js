import {allPostThunkCreator} from '../store/post'
import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Post from './posts/Post'
import CreatePostModal from './posts/CreatePostModal'
import './Feed.css'
import {getUnfollowed} from '../store/follows'
import SideBar from './SideBar'
import { useHistory } from 'react-router-dom'

function Feed(){
    const dispatch = useDispatch()
    const history = useHistory()
    const posts = useSelector(state => state?.post?.posts)
    const user = useSelector(state => state?.session?.user)
    const unfollowedList = useSelector(state => state?.follows?.unfollowed)



    let unfollowidList= unfollowedList?.map(user => user?.id)



    useEffect(()=>{
        (async()=>{
            await dispatch(allPostThunkCreator())

            await dispatch(getUnfollowed(user.id))


        })();
    },[dispatch]);


     return(
        <div className='feedContainerWraper'>
            <div className='feedContaner'>
                <div>
                    <div className='createIconAndImageContainer' >
                        <div className='feedUserProfileImageContainer' onClick={() =>  history.push(`/user/${user?.id}/posts`) } >
                            {user?.profileImage ? <img  className='feedUserProfileImage' src={user?.profileImage} />
                            :<i className ="fa-solid fa-user-astronaut userProfileLogo"></i>}
                        </div>
                        <div className='createPostIconConainer'>
                                <CreatePostModal type={'text'}/>
                                <CreatePostModal type={'image'}/>
                                <CreatePostModal type={'link'}/>
                                <CreatePostModal type={'quote'}/>
                                <CreatePostModal type={'chat'}/>
                        </div>
                    </div>
                    <div className='allFeedPostContainer'>
                        {posts?.map((post)=>{return (
                        <div key={post?.id} className="feedPostProfileImgConatiner">
                            <div className="profileImageContainer" onClick={() =>  history.push(`/user/${post?.user?.id}/posts`)}>
                                {post?.user?.profileImage ? <img className='feedProfileImage' src={post?.user?.profileImage} />
                                :<i className ="fa-solid fa-user-astronaut defaultProfileLogo"></i>}
                            </div>
                            <div>
                                <Post post={post} unfollowList={unfollowidList}/>
                            </div>
                        </div>)
                        })}
                    </div>

                </div>
                <SideBar />
            </div>
        </div>
    )
}


export default Feed
