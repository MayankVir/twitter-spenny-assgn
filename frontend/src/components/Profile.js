import { useState, useEffect } from "react";
import "./feed/Feed.css";
import { useParams, useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import { FaPlus } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    userService.isFollowing(params.username).then((response) => {
      console.log(response);
      if (response.following === true) {
        setIsFollowing(true);
      } else if (response.following === false) {
        setIsFollowing(false);
      } else {
        setIsFollowing(false);
      }
    });
  }, [params.username]);

  const handleFollowButton = () => {
    console.log("FOllowed me");
    setIsFollowing(true);

    userService
      .doFollow(params.username)
      .then((response) => console.log(response));
  };

  const handleUnFollowButton = () => {
    console.log("Unfollowed me");
    userService
      .unFollow(params.username)
      .then((response) => console.log(response));
    setIsFollowing(false);
  };

  return (
    <div className="feed">
      <div className="feed__header">
        <h2 onClick={() => navigate("/dasboard")}>Home</h2>
      </div>
      <div className="profile__main">
        <div className="profile__coverPhoto"></div>
        <div className="profile__allDetails">
          <div className="profile__photo">
            <img
              width="100px"
              height="100px"
              src={`https://avatars.dicebear.com/api/initials/${params.username}.svg`}
              alt=""
            />
          </div>
          <div className="profile__usernameFollow">
            <div className="profile__username">
              <h2> {params.username} </h2>
            </div>
            <div className="profile__followBtn">
              {isFollowing !== null ? (
                isFollowing === true ? (
                  <button
                    onClick={() => handleUnFollowButton()}
                    className="profile_following"
                  >
                    Following <TiTick style={{ marginLeft: "5px" }} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollowButton()}
                    className="profile_notFollowing"
                  >
                    Follow <FaPlus style={{ marginLeft: "5px" }} />
                  </button>
                )
              ) : (
                <></>
              )}
              {/* <button></button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
