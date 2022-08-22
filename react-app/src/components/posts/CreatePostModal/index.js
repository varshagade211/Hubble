import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreatePostForm from './CreatePostForm';
import './index.css'



function CreatePostModal({type}) {
  const [showModal, setShowModal] = useState(false);



  return (
    <>

      {type==='text' && <button  className={'createPosttBtn'} onClick={() =>setShowModal(true)}><i className="fa-brands fa-amilia textIcon"></i></button>}
      {type==='image' && <button className={'createPosttBtn'}  onClick={() =>setShowModal(true)}><i className="fa-solid fa-camera cameraIcon"></i></button>}
      {type==='link' && <button className={'createPosttBtn'} onClick={() =>setShowModal(true)}><i className="fa-solid fa-link linkIcon"></i></button>}
      {type==='quote' && <button  className={'createPosttBtn'} onClick={() =>setShowModal(true)}><i className="fa-solid fa-quote-left quoteIcon"></i></button>}
      {type==='chat' && <button  className={'createPosttBtn'} onClick={() =>setShowModal(true)}><i className="fa-solid fa-comment-dots chatIcon"></i></button>}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
           <CreatePostForm type = {type} setShowModal={setShowModal} />


        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;
