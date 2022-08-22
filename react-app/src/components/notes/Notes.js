import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllNotes } from '../../store/note'
import { useEffect } from 'react'



function Notes({ post}) {
    let id = post.id
    const dispatch = useDispatch()

    const comments = useSelector((state) => Object.values(state.note))
    console.log("THIS IS FRONT",comments)


    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getAllNotesByNoteId(id))

    //     })();
    // }, [dispatch, id]);

    useEffect(() => {
        (async () => {
            await dispatch(getAllNotes())

        })();
    }, [dispatch]);
    

    return ( 
     <>

     {comments.map((comment) => { 
           return (
            <div className="Notes"> 
               { comment.post_id === id ? <p>{comment.description}</p>
               : null}
            </div>
            )
     })}
     </>
    )
   


}

export default Notes