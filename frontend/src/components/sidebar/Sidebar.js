import React from "react";
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import { Button } from "@material-ui/core";

import { GrHomeRounded } from "react-icons/gr";

import { BiHash } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";

import { VscBell } from "react-icons/vsc";

import { FaRegEnvelope } from "react-icons/fa";
import { RiFileList2Line } from "react-icons/ri";
import { MdPermIdentity } from "react-icons/md";
import { CgMoreO } from "react-icons/cg";

function Sidebar() {
  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />
      <SidebarOption active Icon={GrHomeRounded} text="Home" />
      <SidebarOption Icon={BiHash} text="Explore" />
      <SidebarOption Icon={VscBell} text="Notifications" />
      <SidebarOption Icon={FaRegEnvelope} text="Messages" />
      <SidebarOption Icon={BsBookmark} text="Bookmarks" />
      <SidebarOption Icon={RiFileList2Line} text="Lists" />
      <SidebarOption Icon={MdPermIdentity} text="Profile" />
      <SidebarOption Icon={CgMoreO} text="More" />
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>
    </div>
  );
}

export default Sidebar;
