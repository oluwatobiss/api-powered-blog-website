import { useEffect, useState } from "react";

export default function Navigation() {
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const userId = sessionStorage.getItem("apiPoweredBlogUserId");
    const userTokenJson = sessionStorage.getItem("apiPoweredBlogToken");
    const userToken = userTokenJson && JSON.parse(userTokenJson);
    userId && setUserId(userId);
    userToken?.token && setUserToken(userToken.token);
  }, []);

  return (
    <div className="nav-links">
      <a href="/">Home</a>
      {!userId && <a href="/sign-up">Sign up</a>}
      {userId && !userToken && <a href="/log-in">Log in</a>}
      {userToken && <a href="http://localhost:4322">Manage Your Posts</a>}
    </div>
  );
}
