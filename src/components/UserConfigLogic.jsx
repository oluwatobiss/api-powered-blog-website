import { useEffect } from "react";

export default function UserConfigLogic() {
  useEffect(() => {
    const expectedOrigin = import.meta.env.PUBLIC_STAFFEND_URI;
    function handleMessageEvent(e) {
      if (e.origin === expectedOrigin) {
        const userData = e.data;
        if (userData !== null) {
          localStorage.setItem("apiPoweredBlogToken", userData.token);
          localStorage.setItem(
            "apiPoweredBlogUserData",
            JSON.stringify(userData.payload)
          );
        }
      }
    }
    window.addEventListener("message", handleMessageEvent);
    return () => window.removeEventListener("message", handleMessageEvent);
  });
  return (
    <p>
      This page is solely for adding the user's token and data to the web
      storage.
    </p>
  );
}
