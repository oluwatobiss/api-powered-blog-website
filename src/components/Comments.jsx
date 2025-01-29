import { useEffect, useRef, useState } from "react";

const userToken = localStorage.getItem("apiPoweredBlogToken");
const userDataJson = localStorage.getItem("apiPoweredBlogUserData");
const userData = userDataJson && JSON.parse(userDataJson);

export default function Comments({ postId }) {
  const [body, setBody] = useState("");
  const [comments, setComments] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [reload, setReload] = useState(false);
  const [errors, setErrors] = useState([]);
  const commentToEdit = useRef({});

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
      const responseObj = await response.json();

      console.log("=== submitComment Response ===");
      console.log(responseObj);
      console.log(responseObj.errors?.length);

      if (responseObj.errors?.length) {
        setErrors(responseObj.errors);
      } else {
        setComments([responseObj, ...comments]);
        setErrors([]);
        setBody("");
      }
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

      const response = await fetch(
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

      const responseObj = await response.json();

      console.log("=== updateComment Response ===");
      console.log(responseObj);
      console.log(responseObj.errors?.length);

      if (responseObj.errors?.length) {
        setErrors(responseObj.errors);
      } else {
        commentToEdit.current = {};
        setUpdating(false);
        setErrors([]);
        setBody("");

        console.log("=== updateComment reload's state ===");
        console.log(!reload);

        setReload(!reload);
      }
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
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${userToken}` },
        }
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

  function showErrorFor(field) {
    return errors.find((c) => c.path === field) ? (
      <div className="error">{errors.find((c) => c.path === field).msg}</div>
    ) : (
      ""
    );
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
        {showErrorFor("body")}
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
        {showErrorFor("body")}
      </div>
      <div>
        <button type="button" onClick={cancelCommentUpdate}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </div>
    </form>
  );

  function createCommentElements(comments) {
    return comments.map((comment) => {
      const isCommentAuthor = userData.username === comment.authorUsername;
      const isAdmin = userData.status === "ADMIN";
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
          <div>
            {isCommentAuthor || isAdmin ? (
              <button type="button" onClick={() => deleteComment(comment)}>
                Delete
              </button>
            ) : (
              ""
            )}
            {isCommentAuthor ? (
              <button type="button" onClick={() => editComment(comment)}>
                Edit
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    });
  }

  useEffect(() => {
    async function getComments() {
      const response = await fetch(
        `http://localhost:3000/posts/${postId}/comments`
      );
      const comments = await response.json();
      setComments(comments);
    }
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
