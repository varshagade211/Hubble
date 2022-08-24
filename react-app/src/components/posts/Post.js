
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createLikeThunkCreator } from "../../store/post"
import { deletePostThunk } from '../../store/post'
import EditPostModal from './EditPostModal'
import Notes from "../notes/Notes"
// import CreateComment from '../notes/createNote'
import './Post.css'

function Posts({post}){
    const[isfollow , setIsFollow] = useState(false)
    const[isLiked , setIsLiked] = useState(false)
    const[isNote, setIsNote] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state?.session?.user)



    const deleteHandler = async() =>{
        const response= await dispatch(deletePostThunk(post.id))

     }

    const followHandler = async() =>{
        setIsFollow((prev) => !prev)
        // follow dispatch will be here
    }

    const likeHandler = async() =>{
        setIsLiked((prev) => !prev)

    }

    const noteHandler = async() =>{
        setIsNote((prev) => !prev)
        // note dispatch will be here

    }


    return(
        <div className={"postOuterContainer"}>
            <div className="postContainer" key={post.id}>
                <h3 className="postUserName">{post?.user?.username}</h3>

                {post?.type === 'text' &&<h3 className="postTitle"><i className="fa-solid fa-star titleStar"></i> {post?.title}</h3>}
                { post?.type === 'text' &&<div className="postDiscriptionContainer"> <p className="postDiscription">{post?.description}</p></div>}

                {post?.type === 'chat' &&<h3 className="postTitle"><i className="fa-solid fa-star titleStar"></i> {post?.title}</h3>}
                { post?.type === 'chat' &&<div className="postDiscriptionContainer">
                    {post?.description?.split('/')?.map((txt) => <p className="postDiscription">{txt}</p>)}
                </div>}

                {post?.type === 'quote' && <p className="postQuote">"{post?.title}"</p>}
                { post?.type === 'quote' && <h4 className="quoteDesc postDiscription"> - {post?.description}</h4>}

                { post?.type === 'link' && <h3 className="postTitle"> <i className="fa-solid fa-star titleStar"></i>  {post?.title} </h3>}
                {post?.type === 'link' && <a className="postLink" href={post?.link}>{post?.title}</a>}
                { post?.type === 'link' &&<div className="postDiscriptionContainer"> <p  className="postDiscription">{post?.description}</p></div>}

                { post?.type === 'image' && <h3 className="postTitle"><i className="fa-solid fa-star titleStar"></i>  {post?.title} </h3>}
                {post?.type === 'image' && <img className='postImage' src={post?.image?.url}/>}
                { post?.type === 'image' && <div className="postDiscriptionContainer"><p className="postDiscription">{post?.description}</p> </div>}

                <div className="postOtherLinksContainer">
                    <div className="deleteEditBtnContainer">
                        <div>
                             {user?.id === post?.user?.id && <button className='deleteIconBtn'onClick={deleteHandler}><i className="fa-solid fa-trash deletePenIcon"></i></button>}
                        </div>
                        <div>
                            {user?.id === post?.user?.id &&  <EditPostModal type ={post?.type} post={post} />}
                        </div>

                    </div>
                    <div className="followLikeNoteLinkCotainer">

                        <div>
                            <button className="followBtn" onClick={followHandler}>{isfollow?"Follow":"Unfollow"}</button>
                        </div>
                        <div>
                          <button className="noteIcon" onClick={noteHandler}><i className="fa-solid fa-pen-to-square notepenIcon"></i></button>
                        </div>

                        <div>
                            <button className="likeBtn"  onClick={likeHandler}>{isLiked ? <i className="fa-solid fa-heart likedIcon"></i>:
                              <i className="fa-regular fa-heart dislikeIcon"></i>}
                            </button>
                        </div>
                        <div className="likeContainer">
                            <p className="likes">{post.likes}</p>
                        </div>


                    </div>

                </div>
                {isNote && <div className='notesDiv'>
                    <hr></hr>
                    {/* <CreateComment post={post}/> */}
                    <Notes post={post}/>

                </div>}


            </div>

        </div>
    )
}


export default Posts
