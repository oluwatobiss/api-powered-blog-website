import { useEffect, useRef, useState } from "react";

export default function Comments({ postId }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState("");
  const commentToEdit = useRef({});

  const commentSubmissionForm = (
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
  );

  const commentUpdateForm = (
    <form onSubmit={handleCommentUpdate}>
      <div>
        <textarea
          name="comment"
          id="comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button type="button" onClick={handleCommentUpdateCancel}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </div>
    </form>
  );

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
        <div>
          <button type="button">Delete</button>
          <button type="button" onClick={() => handleCommentEditClick(comment)}>
            Edit
          </button>
        </div>
      </div>
    ));
  }

  async function handleCommentSubmission(e) {
    e.preventDefault();
    try {
      console.log("=== handleCommentSubmission ===");
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

      console.log("=== handleCommentSubmission Response ===");
      console.log(commentObj);

      setComments([commentObj, ...comments]);
      setText("");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async function handleCommentUpdate(e) {
    e.preventDefault();
    try {
      console.log("=== handleCommentUpdate ===");
      console.log(userData);

      const commentId = commentToEdit.current.id;
      console.log("=== handleCommentUpdate commentId ===");
      console.log(commentId);

      const response = await fetch(
        `http://localhost:3000/posts/${postId}/comments/${commentId}`,
        {
          method: "PUT",
          body: JSON.stringify({ text }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const commentObj = await response.json();

      console.log("=== handleCommentUpdate Response ===");
      console.log(commentObj);

      commentToEdit.current = {};
      setUpdating(false);
      setText("");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  function handleCommentEditClick(comment) {
    console.log(comment);
    commentToEdit.current = comment;
    setUpdating(true);
    setText(comment.text);
  }

  function handleCommentUpdateCancel() {
    commentToEdit.current = {};
    setUpdating(false);
    setText("");
  }

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
  }, [updating]);

  return (
    <article>
      <h2>{comments.length} Comments</h2>
      {userToken && !updating && commentSubmissionForm}
      {userToken && updating && commentUpdateForm}
      <div>{comments.length ? createCommentElements(comments) : ""}</div>
    </article>
  );
}
