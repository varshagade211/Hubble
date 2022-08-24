
import { useDispatch, useSelector } from "react-redux"
import { getAllNotes, noteDelete} from '../../store/note'
import { useEffect, useState } from 'react'
import CreateComment from '../notes/createNote'
import EditComment from '../notes/editNote'
import '../Feed.css'

function Notes({ post}) {
    let id = post.id
    const dispatch = useDispatch()

    const comments = useSelector((state) => (state?.note?.notes))
   

    const user_id = useSelector(state => state?.session?.user?.id)
    const[isNote, setIsNote] = useState(false)
    const user = useSelector(state => state?.session?.user)

    console.log(post?.user)
    console.log(user_id)
    useEffect(() => {
        (async () => {
            await dispatch(getAllNotes())

        })();
    }, [dispatch]);
    

    const removeComment = (id) => async (e) => {
        
      e.preventDefault()
      dispatch(noteDelete(id))
    }


    const noteHandler = async() =>{
        setIsNote((prev) => !prev)
        // note dispatch will be here

     }




    return ( 
     <>
        <CreateComment post={post}/>

        <div className="feedProfileImage">
         
        {post?.user?.id === user_id ? 
         
         <img className='feedProfileImage' src={user?.profileImage} />
         
         
         :
         <i className ="fa-solid fa-user-astronaut "></i>
        }
      
     </div>
     
     <div className="Container">
     {comments.map((comment) => { 
 
           return (
            <div>
             <div className="Notes">
               { comment?.post_id === id ? 
               <div>{comment?.description}</div>
               : null}
             </div>

             <div className="deleteEditBtn">
               { comment?.user_id === user_id && comment?.post_id === id ? 
                <button className="deleteIconBtn" onClick={removeComment(comment.id)}><i className="fa-solid fa-trash deletePenIcon"></i></button>
                : null
               }

               { comment?.user_id === user_id && comment?.post_id === id ? 
               isNote && <div className='edit'>
                <EditComment comment={comment} id={comment.id}/>
               </div>
               : null
               }
            </div>

            <div>  
               { comment?.user_id === user_id && comment?.post_id === id ? 
                <div>
                <button className="noteIcon" onClick={noteHandler}><i className="fa-solid fa-pen-to-square notepenIcon"></i></button>
                </div>
                : null
               }
            </div>

               
            </div>  
            

            )    
     })}
    </div> 
     </>
    )
   


}

export default Notes