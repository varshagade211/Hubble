import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPostThunkCreator } from "../../store/post";
import { NavLink, useParams } from "react-router-dom";
import Post from "../posts/Post";
import SuggestedUsers from "./unfollowedlist";
import "./followinguserposts.css";

function FollowingUserPosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.post?.posts);
  const { id } = useParams();
//   console.log("rom following use to get id----", typeof(parseInt(id)))
//   const user = useSelector((state) => state?.follows[parseInt(id)]);
//   console.log("from following user page to get following user----",user)
  useEffect(() => {
    (async () => {
      await dispatch(allPostThunkCreator());
    })();
  }, [dispatch]);

  const user_posts = [];
  let user;
  posts.forEach((post) => {
    if (post.user.id === parseInt(id)) {
      user_posts.push(post);
      user = post.user
    }
  });

  //    console.log(user_posts)

  return (
    <div className="followinguserPostContainerWraper">
      <div className="followingusermainpage">
        <div className="userImageContainer">
          {user?.profileImage ? (
            <img className="userImage" src={user?.profileImage} />
          ) : (
            <i className="fa-solid fa-user-astronaut userProfileLogo"></i>
          )}

          <p className="userName">{user?.username}</p>
        </div>
        <div>
          {user_posts.map((post) => {
            return <Post post={post} />;
          })}
        </div>
      </div>

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
  );
}

export default FollowingUserPosts;
