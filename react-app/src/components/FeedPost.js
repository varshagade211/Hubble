import {allPostThunkCreator} from '../store/post'
import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Posts from './posts/Posts'
function Feed(){
    const dispatch = useDispatch()
    const posts = useSelector(state => state?.post?.posts)

    useEffect(()=>{
        (async()=>{
            await dispatch(allPostThunkCreator())

        })();
    },[dispatch]);



    return(
        <div>
           <Posts posts={posts}/>
        </div>
    )
}


export default Feed
