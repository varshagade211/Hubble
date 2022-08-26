import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserFollowers } from "../../store/follows";
import "./followerlist.css";

import SideBar from '../SideBar';

function FollowerList() {

//   const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);

  const followers = useSelector((state) => state?.follows?.followers
  );

  useEffect(() => {
    dispatch(getUserFollowers(user.id));
  }, [dispatch, user.id]);

  return (
    <div className="follower-list-container">
      <div className="follower-list">
        <div className="follower-list-title"> {followers?.length} Followers</div>
        <div className="follow-users">

        {followers?.map((user) => (
          <div key={user?.id} className="follower-users-bar">
            <div className="list-user-info">
              <div className="list-user-icon">
                {user?.profileImage ? (
                  <img src={user?.profileImage} alt="profile_image" />
                ) : (
                  <i className="fa-solid fa-user-astronaut default"></i>
                )}
              </div>
              <div className="list-user-name">
                <Link
                  className="list-user-name"
                  key={user?.id}
                  to={`/user/${user?.id}/posts`}
                >
                  {user?.username}
                </Link>
              </div>

            </div>
          </div>
        ))}
        </div>
      </div>
      <div className="userSideBar follows">
         <SideBar />
        </div>
     
    </div>
  );
}


export default FollowerList;
