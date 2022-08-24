
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {allPostThunkCreator} from '../../store/post'
import { NavLink, useParams } from 'react-router-dom'
import Post from '../posts/Post'


function FollowingUserPosts(){
    const dispatch = useDispatch()
    const posts = useSelector(state => state?.post?.posts)
    const {id} = useParams()
    const user = useSelector(state => state?.session?.user)
    useEffect(()=>{
        (async()=>{
            await dispatch(allPostThunkCreator())

        })();
    },[dispatch]);

    const user_posts = []
    posts.forEach(post => {
        if (post.user.id === parseInt(id)) {
             user_posts.push(post)
        }
  })


   

    return(
    <div className='userPostContainerWraper'>
      <div className='userImageContainer'>
        <div>

            {user_posts.map((post)=>{
                return <Post post={post}/>
            })}
        </div>
        </div>
        <div className='userSideBar'>


                <div className='suggestedUserFollower'>
                   suggested followers will go here
                </div>

        </div>
        </div>

    )
}

export default FollowingUserPosts
