import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreatePostForm from './CreatePostForm';
import './index.css'



function CreatePostModal({type}) {
  const [showModal, setShowModal] = useState(false);



  return (
    <>

      {type==='text' && <div className='createUserPostIcon' onClick={() =>setShowModal(true)}>
      <button  className={'createPosttBtn'} ><i className="fa-brands fa-amilia textIcon"></i></button>
       <p>Text</p>
      </div>}

      {type==='image' && <div className='createUserPostIcon' onClick={() =>setShowModal(true)}>
        <button className={'createPosttBtn'} ><i className="fa-solid fa-camera cameraIcon"></i></button>
         <p> Image </p>
      </div>}
      {type==='link' && <div className='createUserPostIcon' onClick={() =>setShowModal(true)}>
       <button className={'createPosttBtn'} onClick={() =>setShowModal(true)}><i className="fa-solid fa-link linkIcon"></i></button>
       <p>Link </p>
       </div>}
      {type==='quote' && <div className='createUserPostIcon' onClick={() =>setShowModal(true)}>
       <button  className={'createPosttBtn'} onClick={() =>setShowModal(true)}><i className="fa-solid fa-quote-left quoteIcon"></i></button>
       <p>Quote</p>
       </div>
       }
      {type==='chat' && <div className='createUserPostIcon' onClick={() =>setShowModal(true)}>
        <button  className={'createPosttBtn'} onClick={() =>setShowModal(true)}><i className="fa-solid fa-comment-dots chatIcon"></i></button>
        <p> Chat </p>
        </div>}
      {showModal && (
        <Modal className={"createPostModal"} onClose={() => setShowModal(false)}>
           <CreatePostForm type = {type} setShowModal={setShowModal} />


        </Modal>
      )}
    </>
  );
}



export default CreatePostModal;
