import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import axios from 'axios';
function Course() {
    const courseId = localStorage.getItem("currentCourseId");
    const [course, setCourse] = useState({});
    const authHeader = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
      };
    useEffect(() => {
        axios.get(`http://localhost:3000/users/course/${courseId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("userToken")
            }
        }).then((response)=>{
            let data = response.data;
            setCourse(data)
        })
    }, [])
    return <div>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "70px 0px 0px 0px", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "45%", alignItems: "start" }}>
                <img src={course.imageLink} style={{ width: "100%" }}></img>
                <Typography style={{ marginTop: "10px" }} variant="h6">
                    <b>{course.title}</b>
                </Typography>
                <Typography style={{ font: "status-bar", color: "#1b4332e6", }}>
                    {course.description}
                </Typography>
                <div style={{ display: "flex", marginTop: "20px", width: "100%", justifyContent: "space-between" }}>
                    <Button style={{ width: "120px", background: "#348060b0", color: "white" }} variant="contained"
                        onClick={async() => {
                            const response = await axios.post(`http://localhost:3000/users/courses/${courseId}`,{},authHeader);
                            let data = response.data;
                            alert(data.message);
                        }}>PURCHASE</Button>
                    <Typography style={{ color: "#1b4332e6", background: "#1b433223", padding: "4px 10px", borderRadius: "25px" }} variant="subtitle1">
                        <b>${course.price}/-</b>
                    </Typography>
                </div>
            </div>
        </div>
    </div>
}
export default Course;