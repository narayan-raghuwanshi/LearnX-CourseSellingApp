import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
function AdminAppbar() {
    const navigate = useNavigate();
    const [adminEmail, setAdminEmail] = useState();
    useEffect(() => {
        axios.get("http://localhost:3000/admin/me", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("adminToken")
            }
        }).then((response)=>{
            let data = response.data;
            setAdminEmail(data.username);
        })
    }, []);
    if (adminEmail) {
        return (
            <div
                style={{
                    background: "#101128",
                    display: "flex",
                    justifyContent: "space-between",
                    height: "60px",
                }}
            >
                <img
                    src="/src/assets/courselogo.png"
                    style={{
                        width: "130px",
                        margin: "6px",
                    }}
                ></img>

                <div
                    style={{
                        alignSelf: "center"
                    }}
                ><Button
                    variant="text"
                    style={{
                        textTransform: "lowercase",
                        padding: "5px 10px",
                        borderRadius: "15px",
                        margin: "0 10px 0 0",
                        color: "white"
                    }}
                    onClick={() => {
                        navigate("/courses");
                    }}>
                        <Typography>Courses</Typography></Button>
                    <Button
                        variant="contained"
                        style={{
                            margin: "20px",
                            width: "110px",
                            background: "#348060b0",
                            color: "white"
                        }}
                        onClick={() => {
                            localStorage.setItem("adminToken", null);
                            window.location = "/signin"
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>
        );
    } else {
        return (
            <div
                style={{
                    background: "#101128",
                    display: "flex",
                    justifyContent: "space-between",
                    height: "60px",
                }}
            >
                <img
                    src="src/assets/courselogo.png"
                    style={{
                        width: "130px",
                        margin: "6px",
                    }}
                ></img>

                <div
                    style={{
                        alignSelf: "center",
                    }}
                >
                    <Button
                        variant="outlined"
                        color="inherit"
                        style={{
                            width: "110px",
                            height: "35px",
                            color: "white",
                        }}
                        onClick={() => {
                            navigate("/signup");
                        }}
                    >
                        SignUp
                    </Button>
                    <Button
                        variant="contained"
                        style={{ margin: "20px", width: "110px", background: "#348060b0", color: "white" }}
                        onClick={() => {
                            navigate("/signin");
                        }}
                    >
                        Login
                    </Button>
                </div>
            </div>
        );
    }
}
export default AdminAppbar;