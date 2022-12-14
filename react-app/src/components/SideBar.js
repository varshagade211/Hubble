import { useSelector } from 'react-redux'
import SuggestedUsers from './follows/unfollowedlist'
import './SideBar.css'
import { NavLink } from 'react-router-dom'

function SideBar(){
    const user = useSelector(state => state?.session?.user)
    return(
        <div className="sideBar">
            <div className='userPostNavLink'>

                <NavLink className={'postBtn'} to={'/'}><i class="fa-solid fa-house postIcon"></i>Home</NavLink>
                <hr></hr>
                <NavLink className={'postBtn'} to={'/user/posts'}> <i className="fa-brands fa-blogger postIcon"></i>Post</NavLink>
                <hr></hr>
                <NavLink className={'postBtn'} to={'/user/likes'}> <i className="fa-solid fa-heart postIcon"></i>Likes</NavLink>
                <hr></hr>
                <NavLink className={'postBtn'} to={`/user/followings`}> <i className="fa-solid fa-users postIcon"></i>Following </NavLink>
                <hr></hr>
                <NavLink className={'postBtn'} to={`/user/followers`}> <i className="fa-solid fa-users postIcon"></i>Follower </NavLink>
                <hr></hr>

            </div>
            <div className='suggestedUserFollower'>
                <SuggestedUsers />
            </div>

            <div className='linkedIndLinkContainer'>
                <h3 className='developedByH'>Developed By </h3>
                <hr></hr>
                <div className='gitandLinkedInIconHandlerContainer' >
                   <a href={"https://github.com/GrantChristopherson"} target="_blank">
                    <i className="fa-brands fa-github gitHubicon"></i></a>
                    <a className = {"userLinkedInLink"} href={"https://www.linkedin.com/in/GrantChristopherson-SF"} target="_blank">
                    <i className="fa-brands fa-linkedin-in linkedInIcon"></i>
                    </a>
                     <h4 className='developerName'>Grant Christopherson</h4>

                     </div>
                <hr></hr>
                <div className='gitandLinkedInIconHandlerContainer'>
                    <a href={"https://github.com/IsabelArredondo"} target="_blank" ><i className="fa-brands fa-github gitHubicon"></i></a>
                    <a className = {"userLinkedInLink"} href={"https://www.linkedin.com/in/IsabelArredondo-1107a9186"} target="_blank">
                    <i className="fa-brands fa-linkedin-in linkedInIcon"></i> </a>
                    <h4 className='developerName'>Isabel Arredondo</h4>

                </div>
                <hr></hr>
                <div className='gitandLinkedInIconHandlerContainer'>
                     <a href={"https://github.com/reneeluo7 "} target="_blank"><i className="fa-brands fa-github gitHubicon"></i></a>
                      <a className = {"userLinkedInLink"} href={"https://www.linkedin.com/in/rongrong-luo-renee"} target="_blank">
                        <i className="fa-brands fa-linkedin-in linkedInIcon"></i> </a>
                        <h4 className='developerName'>Renee Luo</h4>

                </div>
                <hr></hr>
                <div className='gitandLinkedInIconHandlerContainer'>
                     <a href={"https://github.com/varshagade211"} target="_blank"><i className="fa-brands fa-github gitHubicon"></i></a>
                     <a className = {"userLinkedInLink"} href={"https://www.linkedin.com/in/varsha-gade-7b33aa174/"} target="_blank">
                     <i className="fa-brands fa-linkedin-in linkedInIcon"></i>  </a>
                     <h4 className='developerName'>Varsha Gade</h4>

                </div>
                <hr></hr>
            </div>


        </div>
    )
}

export default SideBar
