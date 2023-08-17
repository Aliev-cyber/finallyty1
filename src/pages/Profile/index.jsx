import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { Avatar, Box, Container, Typography, Paper, Grid } from "@mui/material";
import Comment from "../../components/Comment";
import { useCommentContext } from "../../contexts/CommentContext";

const Profile = () => {
  const { username } = useParams();
  const { getOneUser, oneUser } = useAuthContext();
  const { comments, getComments } = useCommentContext();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  function handleLink(id) {
    navigate(`/details/${id}`);
  }
  useEffect(() => {
    getOneUser(username);
  }, [username]);

  useEffect(() => {
    if (oneUser) {
      setUser({ ...oneUser });
      getComments(`user.username`, oneUser.username);
    }
  }, [oneUser]);

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <Container maxWidth="md" style={{ padding: "1rem" }}>
        <Paper elevation={3} style={{ padding: "2rem", background: "#181818" }}>
          <Box display="flex" alignItems="center" mb={4}>
            <Avatar
              style={{
                width: "120px",
                height: "120px",
                marginRight: "2rem",
              }}
              src="/google.com"
            >
              {user && user.username ? user.username[0].toUpperCase() : ""}
            </Avatar>
            <div>
              <Typography
                variant="h4"
                style={{ color: "white", fontSize: "2rem" }}
              >
                {user ? user.username : ""}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ color: "#888", fontSize: "1.5rem" }}
              >
                {user.date_joined
                  ? `Joined on ${user.date_joined.slice(0, 10)}`
                  : ""}
              </Typography>
            </div>
          </Box>
          <Typography
            variant="h6"
            style={{ color: "white", fontSize: "1.8rem", marginBottom: "1rem" }}
          >
            User Details
          </Typography>
          <div style={{ color: "white", fontSize: "1.6rem" }}>
            {user && (
              <ul>
                <li>
                  <strong>Email:</strong> {user.email}
                </li>
                <li>
                  <strong>Id:</strong> {user.id}
                </li>
              </ul>
            )}
          </div>
        </Paper>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h2"
            fontSize={"3rem"}
            sx={{ padding: "1.5rem", color: "white" }}
          >
            {user && user.username}'s comments
          </Typography>
          <Paper sx={{ padding: "1rem" }}>
            <Grid container spacing={2}>
              {comments.length > 0 ? (
                comments.map((item) => (
                  <Comment
                    item={item}
                    key={item.id}
                    id={item.podId}
                    commentUser={item.user}
                    inProfile={true}
                    userProfile={user}
                    link={handleLink}
                  />
                ))
              ) : (
                <Typography
                  variant="body1"
                  fontSize="1.5rem"
                  justifyContent={"center"}
                >
                  {user && user.username} never left any comments
                </Typography>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default Profile;
