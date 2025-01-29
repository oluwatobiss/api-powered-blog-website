import { useRef, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const iframeUseRef = useRef(null);

  async function authenticateUser(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_BACKEND_URI}/auths`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      const userData = await response.json();

      console.log("=== LoginForm ===");
      console.log(userData);
      console.log(userData.errors?.length);

      localStorage.setItem("apiPoweredBlogToken", userData.token);
      localStorage.setItem(
        "apiPoweredBlogUserData",
        JSON.stringify(userData.payload)
      );
      if (iframeUseRef.current) {
        const targetOrigin = import.meta.env.STAFFEND_URI;
        const iframeWindow = iframeUseRef.current.contentWindow;
        iframeWindow.postMessage(userData, targetOrigin);
      }
      userData.errors?.length
        ? setErrors(userData.errors)
        : (window.location.href = "/");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  function showErrorFor(field) {
    return errors.find((c) => c.path === field) ? (
      <div className="error">{errors.find((c) => c.path === field).msg}</div>
    ) : (
      ""
    );
  }

  return (
    <>
      <iframe
        id="apiBlogIframe"
        src={`${import.meta.env.PUBLIC_STAFFEND_URI}/config-user`}
        ref={iframeUseRef}
        width="0" // "800px"
        height="0" // "600px"
        style={{ border: "none" }}
      ></iframe>
      <form onSubmit={authenticateUser}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {showErrorFor("email")}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {showErrorFor("password")}
        </div>
        <button type="submit">Log in</button>
      </form>
    </>
  );
}
