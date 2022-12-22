import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import {  useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const postData = (e: React.FormEvent) => {
    e.preventDefault();
    let user = { username, password };
    console.log("Now fetching");
    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(user)
    })
      .then((response) => response.json())
      .then((response) => {
        window.localStorage.setItem("token", JSON.stringify(response.token));
        console.log("Token saved", typeof response)
        });
        console.log("Now relocating");
        const token = window.localStorage.getItem("token");
        fetch("/login/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token,
          }
        });
        navigate("/update");
  };

  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid textAlign={"center"}>
          <h2>Login</h2>
          <Typography variant="caption">
            Please enter details to Login
          </Typography>
        </Grid>
        <form method="POST">
          <TextField
            fullWidth
            label="Username"
            value={username}
            placeholder="Enter your username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          ></TextField>
          <TextField
            fullWidth
            label="Password"
            value={password}
            placeholder="Enter your passsword"
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          ></TextField>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            onClick={postData}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
export default Login;
