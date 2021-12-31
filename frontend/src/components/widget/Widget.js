import React, { useState } from "react";
import "./Widget.css";
import SearchIcon from "@material-ui/icons/Search";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import userService from "../../services/user.service";
import { toast } from "react-toastify";

function Widgets() {
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

  return (
    <div className="widgets">
      <div className="widgets__searchLogout">
        <div className="widgets__input">
          <SearchIcon className="widgets__searchIcon" />
          <input
            placeholder="Search Twitter"
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
          />
        </div>

        <div className="widgets__searchBtn" onClick={() => searchForPeople()}>
          Search
        </div>
      </div>
      <button
        variant="outlined"
        className="logoutBtn"
        // fullWidth
        onClick={handleLogout}
      >
        Logout
      </button>
      {/* <button>Logout</button> */}
    </div>
  );
}

export default Widgets;
