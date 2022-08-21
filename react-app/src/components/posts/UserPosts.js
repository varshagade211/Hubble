import {userPostThunkCreator} from '../../store/post'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Post from './Posts'

function UserPosts(){
    const dispatch = useDispatch()
    const userPosts= useSelector( state => state?.post?.userPosts)

    useEffect(()=>{
        dispatch(userPostThunkCreator())
    },[dispatch])



    return(
        <div>
            <h2>user posts</h2>
            <Post posts={userPosts}/>
        </div>
    )
}

export default UserPosts
