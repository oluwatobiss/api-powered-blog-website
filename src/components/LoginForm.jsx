import { useState } from "react";

export default function EditPostForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auths", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const jwtObj = await response.json();
      sessionStorage.setItem("apiPoweredBlogToken", JSON.stringify(jwtObj));
      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
      </div>
      <button type="submit">Log in</button>
    </form>
  );
}
