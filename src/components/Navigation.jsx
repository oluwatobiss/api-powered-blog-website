import { useEffect, useState } from "react";

export default function Navigation() {
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    let userToken = localStorage.getItem("apiPoweredBlogToken");

    console.log("=== Website's Navigation useEffect ===");
    console.log(userToken);

    userToken === "undefined" && (userToken = undefined);
    userToken && setUserToken(userToken);
  }, []);

  return (
    <div className="nav-links">
      <a href="/">Home</a>
      {!userToken && <a href="/log-in">Staff Log in</a>}
      {userToken && <a href="http://localhost:4322">Manage Posts</a>}
    </div>
  );
}
