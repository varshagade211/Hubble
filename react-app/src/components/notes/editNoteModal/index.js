import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditComment from './editNote'




function EditNoteModal({ comment}) {
    const [showModal, setShowModal] = useState(false);



    return (
        <>


          <i onClick={() => setShowModal(true)} className="fa-solid fa-pen-to-square note" > </i>


            {showModal && (

                <Modal className={'editmodal'} onClose={() => setShowModal(false)}>

                    <EditComment comment={comment} id={comment.id} setShowModal={setShowModal} />


                </Modal>
            )}
        </>
    );
}

export default EditNoteModal;
