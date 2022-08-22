import { useState } from "react"
import {createPostThunkCreator} from '../../../store/post'
import {useDispatch} from 'react-redux'
import './CreatePostForm.css'




function CreateTextPostForm({type, setShowModal}){
    const dispatch = useDispatch()
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [image,setImageUrl] = useState('')
    const [link,setLink] = useState('')
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
        let post = {
            title,
            description,
            type:type,
            image,
            link
        }
        let data =  await dispatch(createPostThunkCreator(post))

        if(data){
            setErrors(data)
        }else{
            setShowModal(false)
        }

      }
    return(
        <div className="CreateFormContainer">

           <form onSubmit={handleSubmit} className="createPostForm">
            {/* Text type post form */}
           {type === 'text' && <div>

                <input type="text" className="textTypeTitalInput" placeholder='Title'value={title} onChange={(e)=> setTitle(e.target.value)}/>

               {errors.title &&
                    <div className="error">
                        {errors?.title?.map((error, ind) => (
                            <div key={ind}>{error}</div>
                         ))}
                    </div>
                }
            </div>}

           {type === 'text' && <div>


                <textarea placeholder='Your Text Here' className="textDescriptionInput"  rows={5} value={description} onChange={(e)=> setDescription(e.target.value)}/>
                    {errors?.description &&
                    <div className="error">
                        {errors?.description?.map((error, ind) => (
                            <div key={ind}>{error}</div>
                         ))}
                    </div>}
            </div>}


              {/* quote type post form */}
           {type === 'quote' && <div>

                <input type="text" placeholder=' "Quote" ' className="textTypeTitalInput" value={title} onChange={(e)=> setTitle(e.target.value)}/>

               {errors.title &&
                    <div className="error">
                        {errors?.title?.map((error, ind) => (
                            <div key={ind}>{error}</div>
                         ))}
                    </div>
                }
            </div>}

           {type === 'quote' && <div>
                <input  placeholder="-Scource" value={description} onChange={(e)=> setDescription(e.target.value)}/>
                    {errors?.description &&
                    <div>
                        {errors?.description?.map((error, ind) => (
                            <div key={ind}>{error}</div>
                         ))}
                    </div>}
            </div>}

              {/* Image type post form */}
            {type === 'image' && <div>

                <input type="text" placeHolder='Title' className="textTypeTitalInput" value={title} onChange={(e)=> setTitle(e.target.value)}/>

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
                    <input type = 'text'  className="textDescriptionInput"  placeholder="Image Url" value={image} onChange={(e)=> setImageUrl(e.target.value)}/>
                    {errors?.image &&
                    <div className="error">
                        {errors?.image?.map((error, ind) => (
                            <div key={ind}>{error}</div>
                         ))}
                    </div>}
            </div>}
            {type === 'image' && <div>
                <textarea placeholder='Your Text Here' className="textDescriptionInput"  rows={5} value={description} onChange={(e)=> setDescription(e.target.value)}/>
                    {errors?.description &&
                    <div className="error">
                    {errors?.description?.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>}
            </div>}


            {/* Link type post form */}
            {type === 'link' && <div>

                <input type="text" placeholder="Title" value={title} onChange={(e)=> setTitle(e.target.value)}/>

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
                <input type="text" placeholder='Add Link'value={link} onChange={(e)=> setLink(e.target.value)}/>

                {errors?.link &&
                    <div className="error">
                        {errors?.link?.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                }
            </div>}
            <div>
                <button className="submitPostBtn">Post</button>
            </div>

           </form>
        </div>
    )
}

export default CreateTextPostForm
