import { Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import Addcourse from "./AdminAddcourse";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useContext } from 'react';
import { AdminAppbarContext, UserAppbarContext } from './App';
function UserAllCourses() {
    const [courses, setCourses] = useState([]);
    const { setIsAdminAppbarVisible } = useContext(AdminAppbarContext);
    const { setIsUserAppbarVisible } = useContext(UserAppbarContext);
    setIsAdminAppbarVisible(false);
    setIsUserAppbarVisible(true);
    useEffect(() => {
        fetch("http://localhost:3000/users/courses/", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("userToken"),
            },
        }).then((res) => {
            res.json().then((data) => {
                setCourses(data.courses);
            });
        });
    }, []);
    return <div>
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                margin: "40px"
            }}>
            <Typography
                style={{
                    marginTop: "10px",
                    fontSize: "2rem",
                    color: "#101128"
                }}
                variant="h6">
                <b>{"Explore Library"}</b>
            </Typography>
        </div>
        <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {courses.map(eachCourse => {
                return (<EachCourse course={eachCourse}></EachCourse>)
            })}
        </div>
    </div>

}
function EachCourse(props) {
    const navigate = useNavigate();
    return (

        <Card
            style={{
                padding: "20px",
                background: "#b7b7a42b",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "280px",
                margin: "30px",
                
            }}>
            <img
                src={props.course.imageLink}
                style={{
                    width: "290px",
                    height: "60%"
                }}></img>
            <Typography
                style={{
                    marginTop: "10px",
                    alignSelf: "start"
                }}
                variant="h6">
                <b>{props.course.title}</b>
            </Typography>
            <Typography
                style={{
                    alignSelf: "start",
                    font: "status-bar",
                }}>
                {props.course.description}
            </Typography>
            <div
                style={{
                    display: "flex",
                    marginTop: "20px",
                    width: "280px"
                }}>
                <Button
                    style={{
                        width: "120px",
                        background: "#1b4332e6"
                    }}
                    variant="contained"
                    onClick={() => {
                        localStorage.setItem("currentCourseId", props.course.id);
                        navigate(`/course/${props.course.id}`);
                    }}>EXPLORE</Button>
                <Typography
                    style={{
                        color: "#1b4332e6",
                        marginLeft: "124px",
                        background: "#1b433223",
                        padding: "4px 10px",
                        borderRadius: "25px"
                    }}
                    variant="subtitle1">
                    <b>${props.course.price}/-</b>
                </Typography>
            </div>
        </Card>

    );
}
export default UserAllCourses;