import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editComment } from '../../../store/note'
import './editNote.css'


function EditComment({ comment, setShowModal, id }) {



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
            id: id,
            description: description
        }


        dispatch(editComment(data, id))

            setShowModal(false)



    }

    return (
        <div className="notemodel">
            
            <div className="header">Post Your Update</div>
         <form onSubmit={handleSubmit} className='createUpdate'>

            
            <ul> {errors.map((error, i) => (<li className="editerrors" key={i}>{error}</li>))}</ul>

            <label>


                <textarea

                    id="editcomment"
                    type="text"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    required
                />

            </label>

            <button className='create' type="submit">Post</button>
        </form>
        </div>
    )
}

export default EditComment
