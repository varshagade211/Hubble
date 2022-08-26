import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserFollowers } from "../../store/follows";
import "./followerlist.css";
import SuggestedUsers from './unfollowedlist'
import { NavLink } from "react-router-dom";

function FollowerList() {

//   const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);

  const followers = useSelector((state) =>
    Object.values(state.follows.followers)
  );

  useEffect(() => {
    dispatch(getUserFollowers(user.id));
  }, [dispatch, user.id]);

  return (
    <div className="follower-list-container">
      <div className="follower-list">
        <div className="follower-list-title"> {followers.length} Followers</div>
        <div className="follow-users">

        {followers?.map((user) => (
          <div key={user.id} className="follower-users-bar">
            <div className="list-user-info">
              <div className="list-user-icon">
                {user.profileImage ? (
                  <img src={user.profileImage} alt="profile_image" />
                ) : (
                  <i className="fa-solid fa-user-astronaut default"></i>
                )}
              </div>
              <div className="list-user-name">
                <Link
                  className="list-user-name"
                  key={user.id}
                  to={`/user/${user.id}/posts`}
                >
                  {user.username}
                </Link>
              </div>

            </div>
          </div>
        ))}
        </div>
      </div>
      <div className="userSideBar follows">
          <div className="userPostNavLink">
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
            <NavLink className={"postBtn"} to={`/user/followings`}>
              {" "}
              <i class="fa-solid fa-users postIcon"></i>Following{" "}
            </NavLink>
            <hr></hr>
            <NavLink className={"postBtn"} to={`/user/followers`}>
              {" "}
              <i class="fa-solid fa-users postIcon"></i>Follower{" "}
            </NavLink>
            <hr></hr>
          </div>
          <div className="suggestedUserFollower">
            <SuggestedUsers />
          </div>
        </div>
      {/* <div className="suggest-user-container">
                <SuggestedUsers />
            </div> */}
    </div>
  );
}


export default FollowerList;

