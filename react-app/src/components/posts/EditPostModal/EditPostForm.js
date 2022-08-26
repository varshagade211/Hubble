import { useState } from "react"
import {editPostThunkCreator} from '../../../store/post'
import {useDispatch} from 'react-redux'
import './EditPostForm.css'


function EditPostForm({type,post , setShowModal}){
    const dispatch = useDispatch()
    const [title,setTitle] = useState(post?.title)
    const [description,setDescription] = useState(post?.description)
    const [image,setImageUrl] = useState(post?.image?.url)
    const [link,setLink] = useState(post?.link)
    const [errors,setErrors] = useState({})

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(type ==='image'){
            if(!image.length) {
                setErrors({image:['image required']})
                return
            }
        }

        if(type ==='link'){
            if(!link.length) {
                setErrors({link:['link required']})
                return
            }
        }
        let desc = description
        if(type === 'chat'){
            desc = description?.split("\n")?.join("/")
        }
        let newPost = {
            postId:post.id,
            title,
            description:desc,
            type:type,
            image:image,
            link
        }
        let data =  await dispatch(editPostThunkCreator(newPost))

        if(data){
            setErrors(data)
        }else{
            setShowModal(false)
        }
      }
    return(
        <div className="editFormContainer">

           <form onSubmit={handleSubmit} >




               {/* Text type post form */}
           {type === 'text' && <div>

                <input type="text" placeholder="Title" className="editTextTypeTitalInput" value={title} onChange={(e)=> setTitle(e.target.value)}/>

               {errors.title &&
                    <div className="error">
                        {errors?.title?.map((error, ind) => (
                            <div key={ind}>{error}</div>
                         ))}
                    </div>
                }
            </div>}

           {type === 'text' && <div>


                <textarea  value={description} placeholder="Description"   className="editTextDescriptionInput" onChange={(e)=> setDescription(e.target.value)}/>
                    {errors?.description &&
                     <div className="error">
                        {errors?.description?.map((error, ind) => (
                            <div key={ind}>{error}</div>
                         ))}
                    </div>}
            </div>}


              {/* quote type post form */}
           {type === 'quote' && <div>
                <input type="text" placeholder='"Quote"' className="editTextTypeTitalInput" value={title} onChange={(e)=> setTitle(e.target.value)}/>

                {errors.title &&
                    <div className="error">
                         {errors?.title?.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                }
            </div>}

                {type === 'quote' && <div>
                <input  placeholder="-Source" value={description}  className="editTextDescriptionInput" onChange={(e)=> setDescription(e.target.value)}/>
                    {errors?.description &&
                    <div className="error">
                        {errors?.description?.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>}
                </div>}


                 {/* Image type post form */}
            {type === 'image' && <div>

                <input type="text" placeholder="Title" className="editTextTypeTitalInput" value={title} onChange={(e)=> setTitle(e.target.value)}/>

               {errors.title &&
                     <div className="error">
                        {errors?.title?.map((error, ind) => (
                            <div key={ind}>{error}</div>
                         ))}
                    </div>
                }
            </div>}
            {type === 'image' &&

                 <div>

                    <input type = 'text' placeHolder="Image Url"  className="editTextDescriptionInput" value={image} onChange={(e)=> setImageUrl(e.target.value)}/>
                    {errors?.image &&
                    <div className="error">
                        {errors?.image?.map((error, ind) => (
                            <div key={ind}>{error}</div>
                         ))}
                    </div>}
            </div>}
            {type === 'image' && <div>
                <textarea placeholder='Your Text Here' className="editTextDescriptionInput"  rows={5} value={description} onChange={(e)=> setDescription(e.target.value)}/>
                    {errors?.description &&
                    <div className="error">
                    {errors?.description?.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>}
            </div>}
            {/* Link type post form */}
            {type === 'link' && <div>

                <input type="text" placeholder="Title" className="editTextTypeTitalInput"  value={title} onChange={(e)=> setTitle(e.target.value)}/>

               {errors.title &&
                    <div className="error">
                        {errors?.title?.map((error, ind) => (
                            <div key={ind}>{error}</div>
                         ))}
                    </div>
                }
            </div>}

            {type === 'link' &&
             <div>

                <input type="text" placeholder="Add Link" className="editTextDescriptionInput" value={link} onChange={(e)=> setLink(e.target.value)}/>

                {errors?.link &&
                    <div className="error">
                        {errors?.link?.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                }
                 {type === 'link' && <div>
                <textarea placeholder='Your Text Here' className="editTextDescriptionInput"  rows={5} value={description} onChange={(e)=> setDescription(e.target.value)}/>
                    {errors?.description &&
                    <div className="error">
                    {errors?.description?.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>}
            </div>}
            </div>}
             {/* Chat edit form */}
             {type === 'chat' &&
            <div>
                <input type="text" className="editTextTypeTitalInput" placeholder='Title'value={title} onChange={(e)=> setTitle(e.target.value)}/>
                {errors.title &&
                    <div className="error">
                     {errors?.title?.map((error, ind) => (
                     <div key={ind}>{error}</div>
                ))}
            </div>
            }
            </div>}

            {type === 'chat' && <div>
                <textarea placeholder="Saturn: Hello Jupiter&#10;Jupiter: Hello Saturn" className="editTextDescriptionInput"  rows={5}
                value={description} onChange={(e)=> setDescription(e.target.value)}/>

                {errors?.description &&
                    <div className="error">
                    {errors?.description?.map((error, ind) => (
                        <div key={ind}>{error}</div>
                ))}
                </div>}
            </div>}

            {type === 'chat' &&   <p className="editFormMessage">Slash is new line</p>}

            <div className="closeAndPostBtnContainer">
            <button className="submitPostBtn" onClick={()=>setShowModal(false)}>Close</button>
                <button className="editPostBtn">Edit Post</button>
            </div>

           </form>
        </div>
    )
}

export default EditPostForm
