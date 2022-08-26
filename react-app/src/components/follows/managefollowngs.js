import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { removeFollowing, addUnfollowed } from "../../store/follows";

const ManageFollowings = (user) => {
  

  const dispatch = useDispatch();

  const currentuser = useSelector(state => state?.session?.user)
  let list_user = user.user;


  const unfollowHandler = async (e) => {
    e.preventDefault();


    dispatch(removeFollowing(currentuser.id, list_user.id));

    dispatch(addUnfollowed(list_user));
  };
  return (
    <div className="listed-user-bar">
      <div className="list-user-info">
        <div className="list-user-icon">
          {list_user?.profileImage ? (
            <img src={list_user?.profileImage} alt="profile_image" />
          ) : (
            <i className="fa-solid fa-user-astronaut default"></i>
          )}
        </div>
        <div className="list-user-name">
          <Link className="list-user-name" key={user?.id} to={`/user/${list_user?.id}/posts`}>
            {list_user?.username}
          </Link>

        </div>
      </div>
      <div className="unfollow-btn">
        <button onClick={unfollowHandler}>Unfollow</button>
      </div>
    </div>
  );
};


export default ManageFollowings;
