import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import axios from "../axios";
import "./styles.css";

const Likes = ({ newsURL }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    axios
      .post("/userCommentLike/getUserLikeData", { newsURL })
      .then((res) => {
        // console.log(res.data);
        if (res.data.message.newsURL) setLiked(true);
      })
      .catch((err) => console.log(err.response));

    axios
      .post("/userCommentLike/getLikesForNews", { newsURL })
      .then((res) => {
        // console.log(res.data.message.count);
        setLikeCount(res.data.message.count);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const handleLiked = () => {
    axios
      .post("/userCommentLike/addLikesForNews", { newsURL })
      .then((res) => {
        // console.log(res);
        setLiked(true);
        setLikeCount(likeCount + 1);
      })
      .catch((err) => console.log(err.response));
  };

  const handleUnLiked = () => {
    axios
      .post("/userCommentLike/addLikesForNews", { newsURL: null })
      .then((res) => {
        // console.log(res);
        setLiked(false);
        setLikeCount(likeCount - 1);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      {liked ? (
        <Button onClick={handleUnLiked}>
          <FavoriteIcon color="primary" />
          <p className="like_count">{likeCount}</p>
        </Button>
      ) : (
        <Button onClick={handleLiked}>
          <FavoriteBorderIcon style={{ color: "gray" }} />
        </Button>
      )}
    </div>
  );
};

export default Likes;
