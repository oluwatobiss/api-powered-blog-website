import { useEffect, useRef, useState } from "react";

export default function Comments({ postId }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getComments() {
      const response = await fetch("http://localhost:3000/comments");
      const comments = await response.json();

      console.log("=== getComments useEffect ===");
      console.log(comments);

      setComments(comments);
    }
    getComments();
  }, []);

  async function handleComment(e) {
    e.preventDefault();
    try {
      const userToken = sessionStorage.getItem("apiPoweredBlogToken");
      const userDataJson = sessionStorage.getItem("apiPoweredBlogUserData");
      const userData = userDataJson && JSON.parse(userDataJson);

      console.log("=== Comments ===");
      console.log(userData);

      const response = await fetch("http://localhost:3000/comments", {
        method: "POST",
        body: JSON.stringify({
          text,
          postId,
          authorId: userData.id,
          authorUsername: userData.username,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${userToken}`,
        },
      });
      const commentObj = await response.json();

      console.log("=== handleComment Response ===");
      console.log(commentObj);

      setComments([commentObj, ...comments]);
      setText("")
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  function createCommentElements(comments) {
    // console.log("=== createCommentElements ===");
    // console.log(comments);

    return comments.map((comment) => (
      <div key={comment.id}>
        <div>
          <span>@{comment.authorUsername}</span>{" "}
          <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>
        <div>{comment.text}</div>
      </div>
    ));
  }

  return (
    <article>
      <form onSubmit={handleComment}>
        <div>
          <textarea
            name="comment"
            id="comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button type="button">Cancel</button>
          <button type="submit">Comment</button>
        </div>
      </form>
      <div>{comments.length && createCommentElements(comments)}</div>
    </article>
  );
}
