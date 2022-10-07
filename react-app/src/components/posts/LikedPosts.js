
import {getAllLikedThunkCreator} from '../../store/post'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'

// import { NavLink } from 'react-router-dom'
import Post from './Post'
import './LikedPosts.css'
// import SuggestedUsers from '../follows/unfollowedlist'
import SideBar from '../SideBar'
import { useHistory } from 'react-router-dom'


function LikedPosts(){
    const dispatch = useDispatch()
    const history = useHistory()
    const likedPosts= useSelector( state => state?.post?.likedPosts)
    const user = useSelector(state => state?.session?.user)
    const unfollowedList = useSelector(state => state?.follows?.unfollowed)

    let unfollowidList= unfollowedList.map(user => user.id)

    useEffect(()=>{
        dispatch(getAllLikedThunkCreator(user?.id))
    },[dispatch])



    return(
        <div className='likedPostContainerWraper'>
            <div className='likedPostContaner'>
                <div>
                    <div className='allLikedPostContainer'>
                        {!likedPosts?.length && <h3 className='noLikedPostTxt'>No liked post yet,  please like some posts............</h3>}
                        {likedPosts?.map((post)=>{
                        return (
                            <div key={post?.id} className="likedPostProfileImgConatiner">
                                <div className="likedProfileImageContainer" onClick={()=> history.push(`/user/${user?.id}/posts`)}>
                                    {post?.user?.profileImage ? <img className='likedProfileImage' src={post?.user?.profileImage} />
                                    :<i className ="fa-solid fa-user-astronaut defaultProfileLogo"></i>}
                                </div>
                                <div>

                                    <Post post={post} unfollowList={unfollowidList}/>
                                </div>
                            </div>)
                        })}
                    </div>
                </div>
                <div className='likeSidebarContainer'>
                    <SideBar />
                </div>
            </div>
        </div>)
}

export default LikedPosts
