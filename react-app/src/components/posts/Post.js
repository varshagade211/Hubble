import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {deletePostThunk, createLikeThunkCreator,unLikeThunkCreator} from '../../store/post'
import EditPostModal from './EditPostModal'
import Notes from "../notes/Notes"
// import CreateComment from '../notes/createNote'
import './Post.css'
import { addFollowingThunk, updateUnfollowed } from '../../store/follows'

function Posts({post, unfollowList}){
    const user = useSelector(state => state?.session?.user)

    const[isLiked , setIsLiked] = useState(post?.liked_by?.includes(user?.id))
    const[isNote, setIsNote] = useState(false)
    const dispatch = useDispatch()


    let isfollow = !unfollowList?.includes(post?.user?.id)



   useEffect(()=>{
    setIsLiked(post?.liked_by?.includes(user?.id))

   },[isLiked])

    const deleteHandler = async() =>{
        const response= await dispatch(deletePostThunk(post?.id))

     }

    const handleFollowing = async(e) =>{
         e.preventDefault();

        if(!isfollow) {

            dispatch(addFollowingThunk(user?.id, post?.user?.id))
            dispatch(updateUnfollowed(post?.user?.id))
        }
     }

     const likeHandler = async() =>{



        if(!isLiked){
           await dispatch(createLikeThunkCreator(post?.id,user?.id))
           setIsLiked(true)
        }else{
           await dispatch(unLikeThunkCreator(post?.id,user?.id))
           setIsLiked(false)
        }
        // like dispatch will be here
    }


    const noteHandler = async() =>{
        setIsNote((prev) => !prev)
        // note dispatch will be here

     }


    return(
        <div className={"postOuterContainer"}>
            <div className="postContainer" key={post?.id}>
                <div className="usernameandfollowbtn">

                <h3 className="postUserName">{post?.user?.username}</h3>

                           {(isfollow === false)&& <button className="followBtn" onClick={handleFollowing} >Follow</button>}

                </div>

                {post?.type === 'text' &&<h3 className="postTitle"><i className="fa-solid fa-star titleStar"></i> {post?.title}</h3>}
                { post?.type === 'text' &&<div className="postDiscriptionContainer"> <p className="postDiscription">{post?.description}</p></div>}

                {post?.type === 'chat' &&<h3 className="postTitle"><i className="fa-solid fa-star titleStar"></i> {post?.title}</h3>}
                { post?.type === 'chat' &&<div className="postDiscriptionContainer">
                    {post?.description?.split('/')?.map((txt) => <p className="postDiscription">{txt}</p>)}
                </div>}

                {post?.type === 'quote' && <p className="postQuote">"{post?.title}"</p>}
                { post?.type === 'quote' && <h4 className="quoteDesc postDiscription"> - {post?.description ? post?.description : 'Anonymous'}</h4>}

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
                          <button className="noteIcon" onClick={noteHandler}><i className="fa-solid fa-pen-to-square notepenIcon"></i></button>
                        </div>
                        <div className="likeLogoCountContainer">
                        <div >
                            <button className="likeBtn"  onClick={likeHandler}>{isLiked ? <i class="fa-solid fa-heart likedIcon"></i>:
                              <i class="fa-regular fa-heart dislikeIcon"></i>}
                            </button>
                        </div>
                        <div className="likeContainer">
                            <p className="likes">{post?.liked_by?.length}</p>
                        </div>
                        </div>

                    </div>

                </div>
                {isNote && <div className='notesDiv'>

                    <hr></hr>
                    <div className='backcolor'>

                    <Notes post={post}/>
                    </div>
                </div>}


            </div>

        </div>
    )
}


export default Posts
