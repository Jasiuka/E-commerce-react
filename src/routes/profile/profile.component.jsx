import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/user.context";
import { changeUserName, changeImageUrl } from "../../contexts/user.context";

const Profile = () => {
  const {
    userEmail,
    userCreated,
    userUsername,
    userImageUrl,
    currentUser,
    setUsername,
    setUserImageUrl,
  } = useContext(UserContext);

  const [date, setDate] = useState("");

  const saveNameChange = async () => {
    changeUserName(currentUser, nameValue);
    setUsername(nameValue);
    setNameValue("");
    setBoxStateName("box-collapse");
  };

  const saveUrlChange = async () => {
    changeImageUrl(currentUser, urlValue);
    setUserImageUrl(urlValue);
    setUrlValue("");
    setBoxStateImage("box-collapse");
  };

  useEffect(() => {
    const userSeconds = userCreated.seconds;
    const thisDate = new Date(null);
    thisDate.setTime(userSeconds * 1000);
    const userDay = thisDate.getDate();
    const userMonth = `${thisDate.getMonth() > 9 ? "" : "0"}${
      thisDate.getMonth() + 1
    }`;
    const userYear = thisDate.getFullYear();
    const date = `${userYear} / ${userMonth} / ${userDay}`;
    setDate(date);
  }, [userCreated]);

  const [boxStateName, setBoxStateName] = useState("box-collapse");
  const [boxStateImage, setBoxStateImage] = useState("box-collapse");

  const defaultName = "";
  const defaultUrlValue = "";
  const [nameValue, setNameValue] = useState(defaultName);
  const [urlValue, setUrlValue] = useState(defaultUrlValue);

  const toggleBoxChangeName = () => {
    boxStateName ? setBoxStateName("") : setBoxStateName("box-collapse");
  };
  const toggleBoxChangeImage = () => {
    boxStateImage ? setBoxStateImage("") : setBoxStateImage("box-collapse");
  };

  const onNameChangeHandler = (event) => {
    const name = event.target;
    setNameValue(name.value);
  };
  const onUrlChangeHandler = (event) => {
    const name = event.target;
    setUrlValue(name.value);
  };

  return (
    <div className="profile">
      <h2 className="profile__title ">Your profile</h2>
      <div className="profile__data">
        <div className="profile__data--name profile__data-text">
          <div className="profile__data--name-visible">
            <span>Display name:</span>
            <span>{userUsername}</span>
            <button className="profile__btn" onClick={toggleBoxChangeName}>
              Change display name
            </button>
          </div>
          <div className={`profile__name-change-box ${boxStateName}`}>
            <input
              type="text"
              id="name-change"
              maxLength="14"
              placeholder=""
              value={nameValue}
              onChange={onNameChangeHandler}
            />
            <label htmlFor="name-change" className="name-change__label">
              New display name
            </label>
            <button className="profile__btn" onClick={saveNameChange}>
              Save
            </button>
          </div>
        </div>
        <div className="profile__data--email profile__data-text">
          <span>Email adress:</span>
          <span>{userEmail}</span>
        </div>
        <div className="profile__data--date profile__data-text">
          <span>Account created:</span>
          <span>{date}</span>
        </div>
        <div className="profile__data--image">
          <div className="profile__data--image-visible">
            <span>Profile picture:</span>
            <img className="profile__image" src={userImageUrl} alt="user profile img" />
            <button className="profile__btn" onClick={toggleBoxChangeImage}>
              Change picture
            </button>
          </div>
          <div className={`profile__image-change-box ${boxStateImage}`}>
            <input
              type="text"
              id="image-change"
              placeholder=""
              onChange={onUrlChangeHandler}
            />
            <label htmlFor="image-change" className="image-change__label">
              Image link
            </label>
            <button className="profile__btn" onClick={saveUrlChange}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
