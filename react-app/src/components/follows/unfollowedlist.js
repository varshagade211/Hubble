import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUnfollowed,
  addFollowingThunk,
  updateUnfollowed,
} from "../../store/follows";
import "./unfollowedlist.css";

function SuggestedUsers() {
//   const { id } = useParams();
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  // const [isloaded, setIsloaded] = useState(false);
  const suggest_users = useSelector((state) =>
    Object.values(state.follows.unfollowed)
  );


  useEffect(() => {
    dispatch(getUnfollowed(user.id));
  }, [dispatch, user.id]);

  return (
    <div className="suggest-users-container">
      <div className="suggest-users-title">Check Out These Users </div>
      <div className="suggest-users-list">
        {suggest_users &&
          suggest_users?.map((user) => (
            <div key={user.id} className="suggest-users">
              <div className="suggest-user-info">
                <div className="suggest-users-icon">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="profile_image" />
                  ) : (
                    <i className="fa-solid fa-user-astronaut default"></i>
                  )}
                </div>
                <Link className="suggest-users-name" key={user.id} to={`/users/${user.id}/posts`}>
                  {user.username}
                </Link>
              </div>
              <div className="follow-btn" >
                <FollowClick listeduser={user} />
              </div>

            </div>
          ))}
      </div>
    </div>
  );
}

const FollowClick = (listeduser) => {

  // console.log("listeduser--------", listeduser.listeduser.id)
  const dispatch = useDispatch();
  const current_user = useSelector((state) => state?.session?.user);


  const handleFollowing = async (e) => {
    e.preventDefault();
    dispatch(addFollowingThunk(current_user.id, listeduser.listeduser.id));
    dispatch(updateUnfollowed(listeduser.listeduser.id));
  };

  return (
    <>
      <button key={Math.random()} onClick={handleFollowing}>
        Follow
      </button>
    </>
  );
};


export default SuggestedUsers;

