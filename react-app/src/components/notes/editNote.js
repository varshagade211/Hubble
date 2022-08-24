import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editComment } from '../../store/note'


function EditComment({ comment }) {
    console.log("!!DESCRIPTION FRONT!!", comment.description)
    

    const dispatch = useDispatch()
    const [description, setDescription] = useState(comment?.description);

    


    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            id: comment.id,
            description: description
        }

        console.log("!!DESCRIPTION FRONT!!", data)
        return dispatch(editComment(data, comment.id))
    }

    return (
        <form onSubmit={handleSubmit} className='createUpdate'>
            <label>


                <input

                    id="commentInput"
                    type="text"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    required
                />

            </label>

            <button className='create' type="submit">Edit</button>
        </form>
    )
}

export default EditComment
