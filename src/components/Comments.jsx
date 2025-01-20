import { useEffect, useRef, useState } from "react";

export default function Comments({ postId }) {
  const [body, setBody] = useState("");
  const [comments, setComments] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState("");
  const [reload, setReload] = useState(false);
  const commentToEdit = useRef({});

  function createCommentElements(comments) {
    return comments.map((comment) => {
      const isCommentAuthor = userData.username === comment.authorUsername;
      return (
        <div key={comment.id} className="comment-card">
          <div className="comment-card__bio">
            <span className="comment-card__username">
              @{comment.authorUsername}
            </span>{" "}
            <span className="comment-card__date">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="comment-card__body">{comment.body}</div>
          {isCommentAuthor ? (
            <div>
              <button type="button" onClick={() => deleteComment(comment)}>
                Delete
              </button>
              <button type="button" onClick={() => editComment(comment)}>
                Edit
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    });
  }

  async function submitComment(e) {
    e.preventDefault();
    try {
      console.log("=== submitComment ===");
      console.log(userData);

      const response = await fetch(
        `http://localhost:3000/posts/${postId}/comments`,
        {
          method: "POST",
          body: JSON.stringify({
            body,
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

      console.log("=== submitComment Response ===");
      console.log(commentObj);

      setComments([commentObj, ...comments]);
      setBody("");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async function updateComment(e) {
    e.preventDefault();
    try {
      console.log("=== updateComment ===");
      console.log(userData);

      const commentId = commentToEdit.current.id;
      console.log("=== updateComment commentId ===");
      console.log(commentId);

      await fetch(
        `http://localhost:3000/posts/${postId}/comments/${commentId}`,
        {
          method: "PUT",
          body: JSON.stringify({ body }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      commentToEdit.current = {};
      setUpdating(false);
      setBody("");

      console.log("=== updateComment reload's state ===");
      console.log(!reload);

      setReload(!reload);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async function deleteComment(comment) {
    try {
      const commentId = comment.id;
      console.log("=== deleteComment commentId ===");
      console.log(commentId);

      await fetch(
        `http://localhost:3000/posts/${postId}/comments/${commentId}`,
        { method: "DELETE" }
      );

      console.log("=== deleteComment reload's state ===");
      console.log(!reload);

      setReload(!reload);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  function editComment(comment) {
    console.log(comment);
    commentToEdit.current = comment;
    setUpdating(true);
    setBody(comment.body);
  }

  function cancelCommentUpdate() {
    commentToEdit.current = {};
    setUpdating(false);
    setBody("");
  }

  const commentSubmissionForm = (
    <form onSubmit={submitComment}>
      <div>
        <textarea
          name="comment"
          id="comment"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button type="button" onClick={() => setBody("")}>
          Cancel
        </button>
        <button type="submit">Comment</button>
      </div>
    </form>
  );

  const commentUpdateForm = (
    <form onSubmit={updateComment}>
      <div>
        <textarea
          name="comment"
          id="comment"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button type="button" onClick={cancelCommentUpdate}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </div>
    </form>
  );

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
  }, [reload]);

  return (
    <article>
      <h2>{comments.length} Comments</h2>
      {userToken && !updating && commentSubmissionForm}
      {userToken && updating && commentUpdateForm}
      <div>{comments.length ? createCommentElements(comments) : ""}</div>
    </article>
  );
}
