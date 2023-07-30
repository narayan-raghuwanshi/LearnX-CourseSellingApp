import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import axios from 'axios';
function CourseContent(){
    const courseId = localStorage.getItem("currentCourseId");
    const [course, setCourse] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:3000/users/course/${courseId}`,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("userToken")
            }
        }).then((response)=>{
            let data = response.data;
            setCourse(data)
        })
    }, [])
    return <div>
    <div style={{display: "flex", flexDirection: "row",flexWrap:"wrap",margin: "70px 0px 0px 0px", justifyContent:"center" }}>
        <div style={{display: "flex", flexDirection: "column",width:"45%", alignItems: "center",margin:"40px"}}>
            <Typography style={{ marginTop: "10px",fontSize:"2rem" }} variant="h6">
                <b>{course.title}</b>
            </Typography>
            <Typography style={{ font: "status-bar", color: "#1b4332e6",fontSize:"1.3rem",textAlign:"center" }}>
                {course.description}
            </Typography>
            <Typography style={{ font: "status-bar", color: "#1b43324f",marginTop:"150px",fontSize:"5rem" }}>
                {"Course Content Here"}
            </Typography>
        </div>
    </div>
</div>
}
export default CourseContent;