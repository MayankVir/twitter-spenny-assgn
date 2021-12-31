import Sidebar from "./sidebar/Sidebar";
import Profile from "./Profile";
import Widget from "./widget/Widget";

const User = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <Profile />
      <Widget />
    </div>
  );
};

export default User;
