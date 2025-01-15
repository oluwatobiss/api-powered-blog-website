import { useEffect, useState } from "react";

export default function Navigation() {
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");

  function logoutUser() {
    sessionStorage.removeItem("apiPoweredBlogToken");
    window.location.href = "/";
  }

  useEffect(() => {
    const userToken = sessionStorage.getItem("apiPoweredBlogToken");
    const userDataJson = sessionStorage.getItem("apiPoweredBlogUserData");
    const userData = userDataJson && JSON.parse(userDataJson);
    userToken && setUserToken(userToken);
    userData?.id && setUserId(userData.id);
  }, []);

  return (
    <div className="nav-links">
      <a href="/" className="nav-link">
        Home
      </a>
      {!userId && (
        <a href="/sign-up" className="nav-link">
          Sign up
        </a>
      )}
      {!userToken && (
        <a href="/log-in" className="nav-link">
          Log in
        </a>
      )}
      {userToken && (
        <a href="http://localhost:4322" className="nav-link">
          Manage Your Posts
        </a>
      )}
      {userToken && (
        <span className="nav-link" onClick={logoutUser}>
          Log out
        </span>
      )}
    </div>
  );
}
