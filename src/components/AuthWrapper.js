import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const AuthWrapper = ({ clientId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const onSuccess = (response) => {
    setIsLoggedIn(true);
    setUserData(response.profileObj);
  };

  const onFailure = (error) => {
    console.log("Google sign-in failed:", error);
  };

  const onLogoutSuccess = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <GoogleAuth
      isLoggedIn={isLoggedIn}
      userData={userData}
      onSuccess={onSuccess}
      onFailure={onFailure}
      onLogoutSuccess={onLogoutSuccess}
      clientId={clientId}
    />
  );
};

const GoogleAuth = ({
  isLoggedIn,
  userData,
  onSuccess,
  onFailure,
  onLogoutSuccess,
  clientId,
}) => {
  return (
    <div style={{ marginRight: "32px", marginTop: "32px" }}>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {userData?.name}</p>
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onLogoutSuccess}
          />
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
    </div>
  );
};

export default AuthWrapper;
