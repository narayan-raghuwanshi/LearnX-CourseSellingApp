import { Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function AdminSignup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secretKEY, setSecretKEY] = useState("");
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
          Admin Sign Up
        </Typography>
        <TextField
          style={{ margin: "6px", width: "250px" }}
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
        <TextField
          style={{ margin: "6px", width: "250px" }}
          label="Admin Key"
          variant="standard"
          onChange={(e) => {
            setSecretKEY(e.target.value);
          }}
        />
        <br />
        <Button
          style={{ margin: "20px 86px 0px", width: "120px", background: "#1b4332e6" }}
          variant="contained"
          onClick={async () => {
            const response = await axios.post("http://localhost:3000/admin/signup", {
              username,
              password,
              secretKEY
            })
            let data = response.data;
            alert(data.message);
            if (data.message === 'Admin created successfully') {
              navigate("/signin")
            }
          }}
        >
          Register
        </Button>
      </Card>
    </div>
  );
}
export default AdminSignup;
