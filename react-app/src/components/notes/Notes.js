import { useDispatch, useSelector } from "react-redux"
import { getAllNotes, noteDelete } from '../../store/note'
import { useEffect, useState } from 'react'
import CreateComment from '../notes/createNote'
import EditNoteModal from "./editNoteModal"
import './Notes.css'


function Notes({ post }) {
    let id = post.id
    const dispatch = useDispatch()

    const comments = useSelector((state) => (state?.note?.notes))
    const userImage = useSelector(state => state?.session?.user.profileImage)

    // console.log(comments)

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

    let postComments = comments?.filter(comment => comment?.post_id === id)

    return (
        <>
            <CreateComment post={post} userImage={userImage} />

            {postComments?.length !== 0  && postComments?.map((comment) => {
                return (
                    <div className="commentcontainer">
                        {/* Single comment profile image and description */}
                        <div className="Notes">
                            <div className="profileImageAndDescriptionContainer">
                            {
                                users?.filter(user => user?.id === comment?.user_id )?.map(filteredUser => (
                                        filteredUser?.profileImage ? <img className='ProfileImage' src={filteredUser?.profileImage} />
                                        : <i className="fa-solid fa-user-astronaut img"></i>
                                ))
                            }
                            <div className="description"> {comment?.description} </div>
                            </div>
                            <div className="deleteEditBtn">
                                { comment?.user_id === user_id &&
                                    <button className="notesDelete" onClick={removeComment(comment?.id)}><i className="fa-solid fa-trash deletePenIcon"></i></button>
                                }
                                { comment?.user_id === user_id &&
                                    <div className="editnote" >
                                        <EditNoteModal comment={comment}/>
                                    </div>
                                }
                            </div>
                        </div>

                        {/* { comment?.post_id === id && post.user_id === comment.user_id
                        ?
                        <div className="description">
                            <h1>original poster</h1>{comment?.description}
                        </div>
                        : null
                        } */}

                        {/* Comment edit delete buttons */}
                        {/* <div className="deleteEditBtn">
                            { comment?.user_id === user_id && comment?.post_id === id
                            ?
                            <button className="delete" onClick={removeComment(comment?.id)}><i className="fa-solid fa-trash deletePenIcon"></i></button>
                            : null
                            }
                            { comment?.user_id === user_id && comment?.post_id === id
                            ?
                            <div className="editnote" >
                                <EditNoteModal comment={comment}/>
                            </div>
                            : null
                            }
                        </div> */}
                    </div>
                )
            })}

        </>
    )



}

export default Notes


