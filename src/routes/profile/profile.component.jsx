import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

const Profile = () => {
  const { userEmail, userCreated, userUsername, userImageUrl } =
    useContext(UserContext);
  const userSeconds = userCreated.seconds;
  const thisDate = new Date(null);
  thisDate.setTime(userSeconds * 1000);
  const userDay = thisDate.getDate();
  const userMonth = thisDate.getMonth() + 1;
  const userYear = thisDate.getFullYear();

  return (
    <div className="profile">
      <h2 className="profile__title ">Your profile</h2>
      <div className="profile__data">
        <div className="profile__data--name profile__data-text">
          <span>Display name:</span>
          <span>{userUsername}</span>
        </div>
        <div className="profile__data--email profile__data-text">
          <span>Email adress:</span>
          <span>{userEmail}</span>
        </div>
        <div className="profile__data--date profile__data-text">
          <span>Account created:</span>
          <span>{`${userYear} / ${userMonth} / ${userDay}`}</span>
        </div>
        <div className="profile__data--image">
          <span>Profile picture:</span>
          <img className="profile__image" src={userImageUrl} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
