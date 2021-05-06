import React, { useState, useContext, useEffect } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import "./styles.scss";
import { createReply, updateReply } from "../../features/repliesActions";
import { ReplyContext } from "../Posts/Post/Replies/Replies";

export const ReplyForm = ({ parentId }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imageRemoved, setImageRemoved] = useState(false);
  const [animation, setAnimation] = useState("hidden");
  const [reqStatus, setReqStatus] = useState("idle");
  const [fileKey, setFileKey] = useState("");

  const { currentReplyId, setCurrentReplyId } = useContext(ReplyContext);

  const dispatch = useDispatch();

  const replies = useSelector((state) => state.replies);

  const existingReply = currentReplyId
    ? replies.find((reply) => reply._id === currentReplyId)
    : null;

  // Fill form with reply to edit when Edit is clicked
  useEffect(() => {
    if (currentReplyId) {
      setAuthor(existingReply.author);
      setContent(existingReply.content);
    }
    // eslint-disable-next-line
  }, [currentReplyId]);

  const fieldsCheck = [author, content];
  const canSave = fieldsCheck.every(Boolean) && reqStatus === "idle";

  const clearForm = () => {
    const randomString = Math.random().toString(36);
    setAuthor("");
    setContent("");
    setImage("");
    setImageRemoved(false);
    setFileKey(randomString);
    if (currentReplyId) setCurrentReplyId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      if (!currentReplyId) {
        //-------------------- CREATE REPLY
        try {
          setReqStatus("pending");
          await dispatch(
            createReply({ parent: parentId, author, content, image })
          );
        } catch (error) {
          console.log(error);
        } finally {
          setReqStatus("idle");
          clearForm();
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }
      } else {
        //-------------------- EDIT REPLY
        try {
          const updatedReply =
            image || imageRemoved
              ? { parent: parentId, author, content, image }
              : { parent: parentId, author, content };

          setReqStatus("pending");
          await dispatch(updateReply(currentReplyId, updatedReply));
        } catch (error) {
          console.log(error);
        } finally {
          setReqStatus("idle");
          setCurrentReplyId("");
          clearForm();
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }
      }
    }
  };

  const handleRemoveImage = () => {
    const randomString = Math.random().toString(36);

    setImage("");
    setFileKey(randomString);
    setImageRemoved(true);
    setAnimation("visible");
  };

  const formWrapperStyle = currentReplyId
    ? "form-wrapper form-edit"
    : "form-wrapper";

  return (
    <div className={formWrapperStyle}>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h2>{currentReplyId ? "Edit" : "Add a"} Reply</h2>
        <input
          className="form-input"
          type="text"
          name="author"
          placeholder="Your name"
          value={author}
          maxLength="32"
          onChange={(e) => setAuthor(e.target.value)}
        />{" "}
        <br />
        <textarea
          className="form-input"
          name="content"
          placeholder="Write something"
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />{" "}
        <br />
        <div className="file-upload">
          <label htmlFor="image">Add an image</label>
          <FileBase64
            key={fileKey}
            multiple={false}
            onDone={(image) => setImage(image.base64)}
          />
        </div>
        <div className="remove-image">
          <button
            type="button"
            className="remove-image-button"
            onClick={handleRemoveImage}
          >
            Remove Image
          </button>
          <span
            className="image-removed-text"
            animation={animation}
            onAnimationEnd={() => setAnimation("hidden")}
          >
            Image removed.
          </span>
        </div>
        <input
          type="submit"
          className="button"
          value={currentReplyId ? "Update" : "Reply"}
        />
        <button
          type="button"
          className="button clear-button"
          onClick={clearForm}
        >
          {currentReplyId ? "Cancel" : "Clear"}
        </button>
      </form>
    </div>
  );
};
