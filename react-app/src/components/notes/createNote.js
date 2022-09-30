import { useState } from "react"
import { createNote } from '../../store/note'
import { allPostThunkCreator } from '../../store/post'
import { useDispatch, useSelector } from 'react-redux'
import './createNote.css'


const CreateComment = ({ post }, {userImage}) => {

    const dispatch = useDispatch()
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);



    let post_id = post?.id
    const user = useSelector(state => state?.session?.user)
    const user_id = useSelector(state => state?.session?.user?.id)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validateErrors = [];
        if (description.length < 5) validateErrors.push('comment must be longer than 5 characters');
        if (description.length > 200) validateErrors.push('comment cannot be longer than 200 characters');


        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }

        const data = {

            description

        };


        dispatch(createNote(data, post_id))
        dispatch(allPostThunkCreator())

        setDescription("");

        setErrors([])
    }



    return (
        <>
        {errors.map((error, i) => (<div className=" notesError" key={i}>{error}</div>))}
        <div className='imagecomment'>
            { user?.profileImage ?

                <img className='CreateImage' src={user?.profileImage} />


                :
                <i className="fa-solid fa-user-astronaut default"></i>
            }


                <form onSubmit={handleSubmit} className='createCommentForm' >




                    <div className="createcommentDiv">

                        <textarea

                            id="commentInput"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}

                        />

                    <button className='notesSubmitbutton' type="submit" >Post</button>
                 </div>

                </form>

             </div>

        </>
    )
}

export default CreateComment
