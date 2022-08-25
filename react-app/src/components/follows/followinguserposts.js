import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPostThunkCreator } from "../../store/post";
import { getAllUsers } from "../../store/session";
import { NavLink, useParams } from "react-router-dom";
import Post from "../posts/Post";
import SuggestedUsers from "./unfollowedlist";
import "../posts/UserPost.css";

function FollowingUserPosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.post?.posts);
  const users = useSelector(state => state?.session)
  const { id } = useParams();
//   console.log("rom following use to get id----", typeof(parseInt(id)))
//   const user = useSelector((state) => state?.follows[parseInt(id)]);
//   console.log("from following user page to get following user----",user)
  useEffect(() => {
    (async () => {
      await dispatch(allPostThunkCreator());
      await dispatch(getAllUsers())
    })();
  }, [dispatch]);

  const user_posts = [];
  let user = users[id]
  posts.forEach((post) => {
    if (post.user.id === parseInt(id)) {
      user_posts.push(post);
      // user = post.user
    }
  });



  return (
    <div className="userPostContainerWraper">
      <div className="userImageContainer">
        
          {user?.profileImage ? (
            <img className="userImage" src={user?.profileImage} />
          ) : (
            <i className="fa-solid fa-user-astronaut userProfileLogo"></i>
          )}

          <p className="userName">{user?.username}</p>

        </div>
        <div className='postIconContainer'>

        <div className='userPostContainer'>
          { user_posts ?
          user_posts.map((post) => {
            return <Post post={post} />;
          }): (<p> No post yet.. </p>)}
      <div className="userSideBar">
        <div className="userPostNavLink">
          <div className="postNavLink">
            <NavLink className={"postBtn"} to={"/user/posts"}>
              {" "}
              <i className="fa-brands fa-blogger postIcon"></i> Post
            </NavLink>
            <hr></hr>
            <NavLink className={"postBtn"} to={"/user/likes"}>
              {" "}
              <i class="fa-solid fa-heart postIcon"></i>Likes
            </NavLink>
            <hr></hr>
            <NavLink className={"postBtn"} to={""}>
              {" "}
              <i class="fa-solid fa-users postIcon"></i>Follow user
            </NavLink>
            <hr></hr>
          </div>
        </div>
        <div className="suggestedUserFollower">
          <SuggestedUsers />
        </div>

      </div>
        </div>
        </div>

      {/* </div> */}


    </div>
  );
}

export default FollowingUserPosts;
