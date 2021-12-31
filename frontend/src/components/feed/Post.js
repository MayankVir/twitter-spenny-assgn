import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";

const Post = forwardRef(({ username, text, time }, ref) => {
  return (
    <div className="post" ref={ref}>
      <div className="post__avatar">
        <Avatar
          src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
        />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h4>
              {/* {displayName}{" "} */}
              {/* {verified && <VerifiedUserIcon className="post__badge" />} @ */}
              {username}
            </h4>
            <h6>
              <span>{new Date(parseInt(time)).toDateString()}</span>
              {" , "}
              <span>{new Date(parseInt(time)).toLocaleTimeString()}</span>
            </h6>
          </div>
          <hr />
          <div className="post__headerDescription">
            <textarea defaultValue={text} disabled rows={8}></textarea>
          </div>
        </div>
        <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          <RepeatIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
          <PublishIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
});

export default Post;
