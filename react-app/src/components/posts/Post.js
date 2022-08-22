
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {deletePostThunk} from '../../store/post'
import EditPostModal from './EditPostModal'
import './Post.css'

function Posts({post}){
    const dispatch = useDispatch()
    const user = useSelector(state => state?.session?.user)



    const deleteHandler = async() =>{
        const response= await dispatch(deletePostThunk(post.id))

     }


    return(
        <div className={"postOuterContainer"}>
            <div className="postContainer" key={post.id}>
                <h3 className="postUserName">Dr. {post?.user?.username}</h3>

                {post?.type === 'text' &&<h3 className="postTitle"><i className="fa-solid fa-star titleStar"></i> {post?.title}</h3>}
                { post?.type === 'text' &&<div className="postDiscriptionContainer"> <p className="postDiscription">{post?.description}</p></div>}


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
                           <p> follower icon code | </p>
                        </div>
                        <div>
                          <p> note icon code | </p>
                        </div>
                        <div>
                           <p>like icon code </p>
                        </div>


                    </div>

                </div>


            </div>

        </div>
    )
}


export default Posts
