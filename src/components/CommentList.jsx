import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useCommentContext } from "../contexts/CommentContext";
import Comment from "./Comment";
const CommentList = ({ track, showComments }) => {
  const { comments, getComments } = useCommentContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        getComments("trackId", track.id);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [track, showComments]);
  return (
    <div>
      <Grid sx={{ my: 3, gap: "2rem" }} container spacing={2}>
        {loading ? (
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "30vh",
            }}
          >
            <CircularProgress size={80} />
          </Container>
        ) : comments.length > 0 ? (
          comments.map((item) => {
            return (
              <Comment
                item={item}
                key={item.id}
                id={track.id}
                commentUser={item.user}
              />
            );
          })
        ) : (
          <Typography
            variant="body1"
            fontSize={"20px"}
            sx={{ marginLeft: "5%" }}
          >
            No comments here. Be the first to leave a comment!
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default CommentList;
