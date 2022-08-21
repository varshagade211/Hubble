import { useDispatch, useSelector } from "react-redux"

function Posts({posts}){
    // const dispatch = useDispatch()
    const user = useSelector(state => state?.session?.user)



    return(
        <div>
            <h1>Hello from post</h1>
            {posts?.map((post)=>{

                return(
                    <div key={post.id}>
                      <p>{post?.id}</p>
                      <h5>{post?.title}</h5>
                       <p>{post?.description}</p>
                       {post?.type === 'link' && <a href={post?.link}>{post?.description}</a>}
                       {post?.type === 'image' && <img src={post?.image?.url}/>}
                       {user.id === post.user_id && <button>Delete</button>}
                       {user.id === post.user_id && <button>Edit</button>}
                    </div>
                )

            } )}
        </div>
    )
}


export default Posts
