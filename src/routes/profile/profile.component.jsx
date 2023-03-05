import { useState, useEffect } from "react";
// USING REDUX
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setUserImageUrl } from "../../store/user/user.reducer";
import { dataBase } from "../../utils/firebase/firebase.util";
import { doc, setDoc } from "firebase/firestore";
import Button from "../../components/button/button.component";
import { useNavigate } from "react-router-dom";

// Functions to change username and imageUrl data in DB
export const changeUserName = async (currentUser, newName) => {
  const userRef = doc(dataBase, "users", currentUser.uid);

  const newData = {
    displayName: newName,
  };
  await setDoc(userRef, newData, { merge: true }); // to merge document attributes or change if it exist
};

export const changeImageUrl = async (currentUser, newUrl) => {
  const userRef = doc(dataBase, "users", currentUser.uid);
  const newData = {
    imageUrl: newUrl,
  };
  await setDoc(userRef, newData, { merge: true });
};
// ////////////////////////// ////////////////////////////////

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateHandlder = () => navigate("/sign-in");

  const { userEmail, userCreated, userUsername, userImageUrl, currentUser } =
    useSelector((state) => state.user);

  const [date, setDate] = useState("");

  const settingUsername = (username) => {
    dispatch(setUsername(username));
  };
  const settingImageUrl = (url) => {
    dispatch(setUserImageUrl(url));
  };

  const saveNameChange = async () => {
    changeUserName(currentUser, nameValue);
    settingUsername(nameValue);
    setNameValue("");
    setBoxStateName("box-collapse");
  };

  const saveUrlChange = async () => {
    changeImageUrl(currentUser, urlValue);
    settingImageUrl(urlValue);
    setUrlValue("");
    setBoxStateImage("box-collapse");
  };

  // Getting date in format of YYYY/MM/DD
  useEffect(() => {
    if (userCreated) {
      if (userCreated.seconds) {
        const userSeconds = userCreated.seconds;
        const thisDate = new Date(null);
        thisDate.setTime(userSeconds * 1000);
        const userDay = `${
          thisDate.getDate() > 9 ? " " : "0"
        }${thisDate.getDate()}`;
        const userMonth = `${thisDate.getMonth() > 9 ? "" : "0"}${
          thisDate.getMonth() + 1
        }`;
        const userYear = thisDate.getFullYear();
        const date = `${userYear} / ${userMonth} / ${userDay}`;
        setDate(date);
      } else {
        const userDay = `${
          userCreated.getDate() > 9 ? " " : "0"
        }${userCreated.getDate()}`;
        const userMonth = `${userCreated.getMonth() > 9 ? "" : "0"}${
          userCreated.getMonth() + 1
        }`;
        const userYear = userCreated.getFullYear();
        const date = `${userYear} / ${userMonth} / ${userDay}`;
        setDate(date);
      }
    } else {
      return;
    }
  }, [userCreated]);

  const [boxStateName, setBoxStateName] = useState("box-collapse");
  const [boxStateImage, setBoxStateImage] = useState("box-collapse");

  // Default values of inputs
  const defaultName = "";
  const defaultUrlValue = "";

  // States for watching of changes in inputs
  const [nameValue, setNameValue] = useState(defaultName);
  const [urlValue, setUrlValue] = useState(defaultUrlValue);

  // Toggling change boxes
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

  return !currentUser ? (
    <div className="profile">
      <h2 className="profile__signed-out profile__title">
        You have to sign in first.
      </h2>
      <Button onClick={navigateHandlder}>Click to sign in</Button>
    </div>
  ) : (
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
            <img
              className="profile__image"
              src={userImageUrl}
              alt="user profile img"
            />
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
