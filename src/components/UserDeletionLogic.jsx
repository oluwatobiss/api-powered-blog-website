import { useEffect } from "react";

export default function UserDeletionLogic() {
  useEffect(() => {
    const expectedOrigin = import.meta.env.PUBLIC_STAFFEND_URI;
    function handleMessageEvent(e) {
      if (e.origin === expectedOrigin) {
        const userData = e.data;
        if (userData !== null) {
          localStorage.removeItem("apiPoweredBlogToken");
          localStorage.removeItem("apiPoweredBlogUserData");
        }
      }
    }
    window.addEventListener("message", handleMessageEvent);
    return () => window.removeEventListener("message", handleMessageEvent);
  });
  return (
    <p>
      This page is solely for deleting the user's data from the web storage.
    </p>
  );
}
