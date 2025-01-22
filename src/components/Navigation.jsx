import { useEffect, useState } from "react";

export default function Navigation() {
  const [userToken, setUserToken] = useState("");

  function logoutUser() {
    sessionStorage.removeItem("apiPoweredBlogToken");
    window.location.href = "/";
  }

  useEffect(() => {
    const userToken = sessionStorage.getItem("apiPoweredBlogToken");
    userToken && setUserToken(userToken);
  }, []);

  return (
    <div className="nav-links">
      <a href="/">Home</a>
      {!userToken && <a href="/log-in">Staff Log in</a>}
      {userToken && (
        <>
          <a href="http://localhost:4322">Manage Posts</a>
          <span onClick={logoutUser}>Log out</span>
        </>
      )}
    </div>
  );
}
