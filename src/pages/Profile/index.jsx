import React, { useEffect, useState } from "react";
import "./style.css";
import { useAuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";


const Profile = () => {
	const { id } = useParams();
  const { getOneUser, oneUser } = useAuthContext()
  const [user, setUser] = useState('null')
  useEffect(() => {
    getOneUser(id)
  }, [id])
  useEffect(() => {
		if (oneUser) {
			setUser({...oneUser});
		}
	}, [oneUser]);
 console.log(user);
  return (
    <div className="liked-songs-container">
      <header className="app-header">
        <img
          className="profile-logo"
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          alt="Spotify Logo"
        />
        <h1 className="app-title">{user.email}</h1>
      </header>
    </div>
  );
};

export default Profile;
