import { useState } from "react"
import { createNote } from '../../store/note'
import {allPostThunkCreator} from '../../store/post'
import { useDispatch, useSelector } from 'react-redux'
import './createNote.css'


const CreateComment = ({ post }) => {

    const dispatch = useDispatch()
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);



    let post_id = post.id


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

            <div className="createcommentDiv">

                <form onSubmit={handleSubmit} className='createCommentForm' >
                    <ul> {errors.map((error, i) => (<li key={i}>{error}</li>))}</ul>
                    <label>


                        <textarea

                            id="commentInput"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />

                    </label>
                    <button className='button' type="submit" >Post</button>
                </form>
            </div>
        </>
    )
}

export default CreateComment