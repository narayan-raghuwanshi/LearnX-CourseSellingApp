import { Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import Addcourse from "./AdminAddcourse";
import { Navigate, useNavigate } from "react-router-dom";
function UserPurchasedCourses() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/users/purchasedCourses/", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("userToken"),
            },
        }).then((res) => {
            res.json().then((data) => {
                setCourses(data.purchasedCourses);
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
                <b>{"My Courses"}</b>
            </Typography>
        </div>
        <div
            style={{
                marginTop: "10px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center"
            }}>

            {courses.map(eachCourse => {
                return (<EachCourse course={eachCourse}></EachCourse>)
            })}
        </div>
    </div>

}
function EachCourse(props) {
    const navigate = useNavigate();
    return (
        <div>
            <Card
                style={{
                    padding: "20px",
                    background: "#b7b7a42b",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "280px",
                    margin: "30px",
                }}
                onClick={() => {
                    localStorage.setItem("currentCourseId", props.course.id);
                    navigate(`/coursecontent/${props.course.id}`);
                }}>
                <img src={props.course.imageLink}
                    style={{
                        width: "290px",
                        height: "180px"
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
            </Card>
        </div>
    );
}
export default UserPurchasedCourses;