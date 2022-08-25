import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editComment } from '../../store/note'
import './editNote.css'

function EditComment({ comment, setShowModal }) {

    

    const dispatch = useDispatch()
    const [description, setDescription] = useState(comment?.description);
    // const[isNote, setIsNote] = useState(false)
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault()
        

        let validateErrors = [];
        if (description.length < 5) validateErrors.push('comment must be longer than 5 characters');
        if (description.length > 200) validateErrors.push('comment cannot be longer than 200 characters');


        if (validateErrors.length > 0) {
            setErrors(validateErrors);
            return;
        }

        const data = {
            id: comment.id,
            description: description
        }


        dispatch(editComment(data, comment.id))

    
        
            setShowModal(false)
        
            
        
    }

    return (
         <form onSubmit={handleSubmit} className='createUpdate'>
            <ul> {errors.map((error, i) => (<li key={i}>{error}</li>))}</ul>
            <label>


                <input

                    id="editcomment"
                    type="text"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    required
                />

            </label>

            <button className='create' type="submit">Update</button>
        </form>
    )
}

export default EditComment
