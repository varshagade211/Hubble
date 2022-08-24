import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditPostForm from './EditPostForm';
import './index.css'



function EditPostModal({type , post}) {
  const [showModal, setShowModal] = useState(false);

 

  return (
    <>

      <button className='editIconBtn' onClick={() =>setShowModal(true)}><i className="fa-solid fa-pen editPenIcon"></i></button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
           <EditPostForm type = {type} post={post} setShowModal={setShowModal}/>


        </Modal>
      )}
    </>
  );
}

export default EditPostModal;
