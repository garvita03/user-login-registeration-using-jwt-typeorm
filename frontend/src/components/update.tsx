import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";

const Update = () => {
  const [name, setName] = useState("");

  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };

  const updateData = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Entered updation process");
    let newName = { name };
    const token = window.localStorage.getItem("token");
    console.log(token);
    fetch("/auth/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(newName),
    })
      .then((response) => console.log(response.statusText));
  };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid textAlign={"center"}>
          <h2>Update Name</h2>
          <Typography>Please enter new name</Typography>
        </Grid>
        <form method="POST">
          <TextField
            fullWidth
            label="Name"
            value={name}
            placeholder="Enter new name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={updateData}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
export default Update;
