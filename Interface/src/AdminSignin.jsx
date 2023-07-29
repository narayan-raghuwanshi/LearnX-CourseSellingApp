import { Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import axios from 'axios';
function AdminSignin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      style={{
        marginTop: "200px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card style={{ padding: "20px", background: "#b7b7a42b" }}>
        <Typography style={{ margin: "6px" }} variant="h6">
          Admin Sign In
        </Typography>
        <TextField
          style={{ margin: "6px", width: "250px" }}
          id="standard-basic"
          label="Email"
          variant="standard"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br />
        <TextField
          style={{ margin: "6px", width: "250px" }}
          label="Password"
          variant="standard"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <Button
          variant="contained"
          style={{
            margin: "20px 86px 0px",
            width: "120px",
            background: "#1b4332e6",
          }}
          onClick={async () => {
            const response = await axios.post('http://localhost:3000/admin/login', {
              username,
              password
            })
            let data = response.data;
            localStorage.setItem("adminToken", data.token);
            window.location = (data.token !== undefined) ? "/courses" : "/signin";
          }}
        >
          Login
        </Button>
      </Card>
    </div>
  );
}
export default AdminSignin;
