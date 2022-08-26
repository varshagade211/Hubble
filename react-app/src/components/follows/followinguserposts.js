import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPostThunkCreator } from "../../store/post";
import { getAllUsers } from "../../store/session";
import { NavLink, useParams } from "react-router-dom";
import Post from "../posts/Post";
import SuggestedUsers from "./unfollowedlist";
// import "../posts/UserPost.css";
import './followinguserposts.css'
import SideBar from '../SideBar'

function FollowingUserPosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.post?.posts);
  const users = useSelector((state) => state?.session);
  const { id } = useParams();
  
  useEffect(() => {
    (async () => {
      await dispatch(allPostThunkCreator());
      await dispatch(getAllUsers());
    })();
  }, [dispatch]);

  const user_posts = [];
  let user = users[id];
  posts.forEach((post) => {
    if (post?.user?.id === parseInt(id)) {
      user_posts.push(post);
      // user = post.user
    }
  });

  return (
    <div className="userPostContainerWraper">
      <div className="userImageContainer">
        <div className="addoncontainer">

        {user?.profileImage ? (
          <img className="userImage" src={user?.profileImage} />
        ) : (
          <i className="fa-solid fa-user-astronaut userProfileLogo"></i>
        )}

        <p className="userName">{user?.username}</p>
        </div>
      </div>
      <div className="postIconContainer">
        <div>

          <div className="userPostContainer">
            {user_posts.length !== 0 ? (
              user_posts.map((post) => {
                return <Post post={post} />;
              })
            ) : (
             <div className="nopostyet">No post at this moment...</div>
            )}
          </div>

        </div>
        
        <SideBar />
      </div>

    </div>
  );
}

export default FollowingUserPosts;
