import { useDispatch, useSelector } from "react-redux"
import { getAllNotes, noteDelete } from '../../store/note'
import { useEffect, useState } from 'react'
import CreateComment from '../notes/createNote'
import EditComment from '../notes/editNote'
import { Modal } from '../../context/Modal';
import './Notes.css'


function Notes({ post }) {
    let id = post.id
    const dispatch = useDispatch()

    const comments = useSelector((state) => (state?.note?.notes))
    const userImage = useSelector(state => state?.session?.user.profileImage)
   

    const user_id = useSelector(state => state?.session?.user?.id)

    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);



    useEffect(() => {
        (async () => {
            await dispatch(getAllNotes())

        })();
    }, [dispatch]);


    const removeComment = (id) => async (e) => {

        e.preventDefault()
        dispatch(noteDelete(id))
    }

    return (
        <>
            <CreateComment post={post} userImage={userImage} />


            {comments.map((comment) => {

                return (
                    <div className="commentcontainer">






                        <div className="Notes">


                            {comment?.post_id === id ?
                                <div>
                                    {users.filter(user => user.id === comment.user_id).map(filteredUser => (
                                        <div>
                                            {filteredUser?.profileImage ? <img className='ProfileImage' src={filteredUser?.profileImage} />
                                                : <i className="fa-solid fa-user-astronaut img"></i>}
                                        </div>
                                    ))}
                                </div>
                                : null}

                            {comment?.post_id === id ?

                                <div className="description">
                                    {comment?.description}
                                </div>



                                : null}

                        </div>

                        {comment?.post_id === id && post.user_id === comment.user_id ?



                            <div className="description">
                                <h1>original poster</h1>
                                {comment?.description}
                            </div>



                            : null}



                        <div className="deleteEditBtn">
                            {comment?.user_id === user_id && comment?.post_id === id ?
                                <button className="delete" onClick={removeComment(comment.id)}> <i className="fa-solid fa-trash deletePenIcon"></i></button>
                                : null
                            }



                            {comment?.user_id === user_id && comment?.post_id === id ?
                                <div className="editnote" >

                                    {<button className={'note'} onClick={() => setShowModal(true)}><i className="fa-solid fa-pen-to-square notepenIcon" > </i></button>}


                                    {showModal && (

                                        <Modal editmodal={'editmodal'} onClose={() => setShowModal(false)}>

                                            <EditComment comment={comment} id={comment.id} setShowModal={setShowModal} />


                                        </Modal>
                                    )}

                                </div>
                                : null
                            }
                        </div>


                    </div>


                )
            })}

        </>
    )



}

export default Notes
