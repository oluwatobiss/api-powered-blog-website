import { useRef, useState } from "react";

export default function Comments({ postId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const checkedDbComments = useRef(false);

  console.log({ postId });
  console.log(comments);
  console.log(checkedDbComments);

  if (!comments.length && !checkedDbComments.current) {
    setComments(["Love", "Peace"]);
    checkedDbComments.current = true;
  }

  async function handleComment(e) {
    e.preventDefault();
    try {
      const userToken = sessionStorage.getItem("apiPoweredBlogToken");
      const userId = sessionStorage.getItem("apiPoweredBlogUserId");
      await fetch("http://localhost:3000/comments", {
        method: "POST",
        body: JSON.stringify({ comment, postId, userId }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${userToken}`,
        },
      });
      setComments([comment, ...comments]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <article>
      <form onSubmit={handleComment}>
        <div>
          <textarea
            name="comment"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button type="button">Cancel</button>
          <button type="submit">Comment</button>
        </div>
      </form>
      <div>{comments}</div>
    </article>
  );
}
