import { Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
function UserSignup(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return <div
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
        User Sign Up
      </Typography>
      <TextField
        style={{ margin: "6px", width: "250px" }}
        id="standard-basic"
        label="Email"
        variant="standard"
        onChange={(e)=>{
          setUsername(e.target.value);
        }}
      />
      <br />
      <TextField
        style={{ margin: "6px", width: "250px" }}
        id="standard-basic"
        label="Password"
        variant="standard"
        onChange={(e)=>{
          setPassword(e.target.value);
        }}
      />
      <br />
      <Button
        style={{ margin: "20px 86px 0px", width: "120px", background: "#1b4332e6" }}
        variant="contained"
        onClick={() => {
          fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({
              username,
              password
            })
          })
            .then((res) => {
              res.json().then(data => {
                localStorage.setItem("userToken", data.token);
                window.location = (data.token!== undefined)? "/userallcourses":"/usersignin";
              })
            })
        }}
      >
        Register
      </Button>
    </Card>
  </div>
}
export default UserSignup;