import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserFollowers } from "../../store/follows";
import {
  addFollowingThunk,
  updateUnfollowed,
} from "../../store/follows";
import "./followerlist.css";

import SideBar from '../SideBar';

function FollowerList() {

//   const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  // const unfollowList = useSelector(state => Object.values(state.follows.unfollowed))
  // console.log(unfollowList)
  const followers = useSelector((state) => state?.follows?.followers
  );
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getUserFollowers(user.id)).then(() => setIsLoaded(true));
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
             { <div className="follow-btn" >
                <FollowClick listeduser={user} />
              </div>}

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

const FollowClick = (listeduser) => {


  const dispatch = useDispatch();
  const current_user = useSelector((state) => state?.session?.user);


  const handleFollowing = async (e) => {
    e.preventDefault();
    dispatch(addFollowingThunk(current_user?.id, listeduser?.listeduser?.id));
    dispatch(updateUnfollowed(listeduser?.listeduser?.id));
  };

  return (
    <>
      <button key={Math.random()} onClick={handleFollowing}>
        Follow
      </button>
    </>
  );
};

export default FollowerList;
