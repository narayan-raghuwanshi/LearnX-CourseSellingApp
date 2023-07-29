import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useContext } from 'react';
import { AdminAppbarContext, UserAppbarContext } from './App';
import './App.css';
function UserAppbar() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState();
    const { setIsAdminAppbarVisible } = useContext(AdminAppbarContext);
    const { setIsUserAppbarVisible } = useContext(UserAppbarContext);
    useEffect(() => {
        fetch("http://localhost:3000/users/me", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("userToken")
            },
        }).then((res) => {
            res.json().then((data) => {
                setUserEmail(data.username);
            });
        });
    }, []);
    if (userEmail) {
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
                        alignSelf: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Button
                        variant="text"
                        style={{
                            textTransform: "lowercase",
                            padding: "5px 10px",
                            borderRadius: "15px",
                            margin: "0 10px 0 0",
                            color:"white"
                        }}
                        onClick={() => {
                            navigate("/userallcourses");
                        }}>
                        <Typography>Courses</Typography></Button>
                    <Button
                        variant="text"
                        style={{
                            textTransform: "lowercase",
                            padding: "5px 10px",
                            borderRadius: "15px",
                            margin: "0 10px 0 0",
                            color:"white"
                        }}
                        onClick={() => {
                            navigate("/userpurchasedcourses");
                        }}>
                        <Typography>purchased</Typography></Button>
                    <Button
                        variant="contained"
                        style={{
                            margin: "20px",
                            width: "110px",
                            background: "#348060b0",
                            color:"white"
                        }}
                        onClick={() => {
                            localStorage.setItem("userToken", null);
                            window.location = "/usersignin"
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
                    <Button style={{ textDecoration: "none", font: "small-caption",textTransform:"lowercase", fontSize: "1rem", margin: "6px", color: "#26c4ebcf" }}
                        onClick={() => {
                            setIsUserAppbarVisible(false);
                            setIsAdminAppbarVisible(true);
                            navigate("/signin")
                        }}><>Login as Admin</></Button>
                    <Button
                        variant="outlined"
                        color="inherit"
                        style={{
                            width: "110px",
                            height: "35px",
                            color: "white",
                        }}
                        onClick={() => {
                            navigate("/usersignup");
                        }}
                    >
                        SignUp
                    </Button>
                    <Button
                        variant="contained"
                        style={{ margin: "20px", width: "110px", background: "#348060b0",color:"white" }}
                        onClick={() => {
                            navigate("/usersignin");
                        }}
                    >
                        Login
                    </Button>
                </div>
            </div>
        );
    }
}
export default UserAppbar;