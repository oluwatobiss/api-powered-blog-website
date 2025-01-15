import { useEffect, useState } from "react";

export default function Comments({ postId }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const userToken = sessionStorage.getItem("apiPoweredBlogToken");
    const userDataJson = sessionStorage.getItem("apiPoweredBlogUserData");
    const userData = userDataJson && JSON.parse(userDataJson);
    async function getComments() {
      const response = await fetch(
        `http://localhost:3000/posts/${postId}/comments`
      );
      const comments = await response.json();
      setComments(comments);
    }
    userToken && setUserToken(userToken);
    userData && setUserData(userData);
    getComments();
  }, []);

  async function handleCommentSubmission(e) {
    e.preventDefault();
    try {
      console.log("=== handleComment ===");
      console.log(userData);

      const response = await fetch(
        `http://localhost:3000/posts/${postId}/comments`,
        {
          method: "POST",
          body: JSON.stringify({
            text,
            authorId: userData.id,
            authorUsername: userData.username,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const commentObj = await response.json();

      console.log("=== handleComment Response ===");
      console.log(commentObj);

      setComments([commentObj, ...comments]);
      setText("");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  function createCommentElements(comments) {
    return comments.map((comment) => (
      <div key={comment.id} className="comment-card">
        <div className="comment-card__bio">
          <span className="comment-card__username">
            @{comment.authorUsername}
          </span>{" "}
          <span className="comment-card__date">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="comment-card__text">{comment.text}</div>
      </div>
    ));
  }

  return (
    <article>
      <h2>{comments.length} Comments</h2>
      {userToken && (
        <form onSubmit={handleCommentSubmission}>
          <div>
            <textarea
              name="comment"
              id="comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button type="button" onClick={() => setText("")}>
              Cancel
            </button>
            <button type="submit">Comment</button>
          </div>
        </form>
      )}
      <div>{comments.length ? createCommentElements(comments) : ""}</div>
    </article>
  );
}
