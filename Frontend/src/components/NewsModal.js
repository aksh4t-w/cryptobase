import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "../axios";
import { TextField } from "@mui/material";
import { myContext } from "../context/Context";
import AddCommentIcon from "@mui/icons-material/AddComment";
import "./styles.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 200,
  bgcolor: "rgb(20 12 23 / 90%)",
  border: "2px solid #000",
  boxShadow: 24,
  color: "lightgray",
  p: 6,
};

const NewsModal = ({ newsURL, coinId }) => {
  const { user } = useContext(myContext);
  // console.log(user);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");

  // console.log(newsURL);
  const handleOpen = () => {
    axios
      .post("/userCommentLike/get/comment", { newsURL })
      .then((res) => {
        setComments(res.data.message);
        console.log(res);
        setOpen(true);
      })
      .catch((err) => console.log(err.response));
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    const commentData = { userComment, name: user.username };
    axios
      .post("/userCommentLike/set/comment", {
        commentData: JSON.stringify(commentData),
        emailId: user.emailId,
        timeStamp: Date.now().toString(),
        ticker: coinId,
        newsURL: newsURL,
      })
      .then((res) => {
        setComments([
          ...comments,
          {
            comments_data: JSON.stringify(commentData),
            emailId: user.emailId,
            name: user.username,
          },
        ]);
        // console.log(res);
        setUserComment("");
        // setOpen(true);
      })
      .catch((err) => console.log(err.response));
  };

  const handleKeyPress = (e) => {
    // console.log(e);
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <AddCommentIcon style={{ color: "lightgray" }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comments
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            {comments.map((item) => (
              <div className="comment_data">
                {/* {JSON.parse(item.comments_data).userComment} */}
                <span className="comment">
                  {JSON.parse(item.comments_data).userComment}
                </span>
                <span className="comment_user">
                  -{JSON.parse(item.comments_data).name}
                </span>
              </div>
            ))}
          </Typography>
          <TextField
            variant="outlined"
            label="Add your comment"
            color="secondary"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            focused
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleSubmit}>Submit Comment</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default NewsModal;
