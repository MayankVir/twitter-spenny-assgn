import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
// import db from "./firebase";
import FlipMove from "react-flip-move";
import tweetService from "../../services/tweet.service";
import { useNavigate } from "react-router";
import userService from "../../services/user.service";
import { toast } from "react-toastify";
import SearchIcon from "@material-ui/icons/Search";

function Feed() {
  const [posts, setPosts] = useState([]);

  const sortDesc = (tweets) => {
    const sortedTweets = tweets.sort((a, b) => b.createdAt - a.createdAt);
    return sortedTweets;
  };

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const searchForPeople = () => {
    if (searchValue.length) {
      userService.searchUser(searchValue).then((response) => {
        if (response.username) {
          toast.success("User found");
          navigate(`/${response.username}`);
        } else {
          toast.error("No User found", {
            position: "bottom-right",
          });
          console.log("error got in widget");
        }
      });
    } else {
      toast.error("Please enter a valid username", {
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    tweetService.getTweets().then((response) => {
      const finalTweets = sortDesc(response.tweets);
      setPosts(finalTweets);
    });
  }, []);

  const showTweet = () => {
    console.log("here");
    tweetService.getTweets().then((response) => {
      const finalTweets = sortDesc(response.tweets);
      setPosts(finalTweets);
    });
  };

  return (
    <div className="feed">
      <div className="feed__header">
        <div>
          <h2>Home</h2>
          <div className="feed_searchLogout">
            {/* <div className="widgets"> */}
            <div className="widgets__searchLogout">
              <div className="widgets__input">
                <SearchIcon className="widgets__searchIcon" />
                <input
                  placeholder="Search Twitter"
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="text"
                />
              </div>

              <div
                className="widgets__searchBtn"
                onClick={() => searchForPeople()}
              >
                Search
              </div>
            </div>
            <button
              variant="outlined"
              className="logoutButton"
              // fullWidth
              onClick={handleLogout}
            >
              Logout
            </button>
            {/* <button>Logout</button> */}
            {/* </div> */}
          </div>
        </div>
        <TweetBox showTweet={showTweet} />
      </div>
      {/*  */}
      <FlipMove>
        {/* <div> */}
        {posts.map((post) => (
          <Post
            key={post._id}
            username={post.username}
            text={post.tweet}
            // avatar={post.avatar}
            time={post.createdAt}
          />
        ))}
        {/* </div> */}
      </FlipMove>
    </div>
  );
}

export default Feed;
