import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const postData = (event: React.FormEvent) => {
    event.preventDefault();
    //const user = { username, name, password };
    fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        name,
        password,
      }),
    })
    window.alert("User registered");
    console.log("User registered");
  };

  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid textAlign={"center"}>
          <h2>Register</h2>
          <Typography variant="caption">
            Please fill in the details to register
          </Typography>
        </Grid>
        <form method="POST">
          <TextField
            fullWidth
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            fullWidth
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={postData}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Register;
