import { Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil';
function AdminEditcourse() {
    const courseId = localStorage.getItem("currentCourseId");
    // const [course, setCourse] = useState({});
    const setCourse = useSetRecoilState(courseState);
    console.log("Parent");
    useEffect(() => {
        fetchCourse(courseId);
    }, [])

    function fetchCourse(courseId) {
        fetch(`http://localhost:3000/admin/course/${courseId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("adminToken")
            }
        }).then(res => {
            res.json().then(data => { setCourse(data) })
        })
    }
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap"
            }}>
            <CourseDetails ></CourseDetails>
            <CourseEditSection fetchCourse={fetchCourse} courseId={courseId}></CourseEditSection>
        </div>
    );
}
function CourseDetails() {
    const course = useRecoilValue(courseState);
    console.log("Details");
    return (
        <Card
            style={{
                padding: "20px",
                background: "#b7b7a42b",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "280px",
                margin: "100px 5px 0 0",
            }}>
            <img src={course.imageLink}
                style={{
                    width: "290px",
                    height: "180px"
                }}></img>
            <div
                style={{
                    alignSelf: "start",
                    marginTop: "10px"
                }}>
                <Typography
                    variant="h6">
                    <b>{course.title}</b>
                </Typography>
                <Typography
                    style={{
                        font: "status-bar"
                    }}>
                    {course.description}
                </Typography>
                <Typography
                    style={{
                        color: "#1b4332e6",
                        background: "#1b433223",
                        padding: "4px 10px",
                        borderRadius: "25px",
                        width: "60px",
                        marginTop: "10px"
                    }}
                    variant="subtitle1">
                    <b>${course.price}/-</b>
                </Typography>

            </div>
        </Card>
    )
}
function CourseEditSection({fetchCourse,courseId }) {
    console.log("Update");
    const course = useRecoilValue(courseState);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [price, setPrice] = useState("");
    const [published, setPublished] = useState(false);
    const navigate = useNavigate();
    return (
        <div
            style={{
                margin: "100px 10px 0 5px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Card
                style={{
                    padding: "20px",
                    background: "#1b433223",
                }}
            >
                <Typography
                    style={{
                        margin: "6px",
                    }}
                    variant="h6"
                >
                    Edit course details !
                </Typography>
                <TextField
                    style={{
                        margin: "6px",
                        width: "250px",
                    }}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    placeholder={course.title}
                    label="New Title"
                    variant="outlined"
                />
                <br />
                <TextField
                    style={{
                        margin: "6px",
                        width: "250px",
                    }}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    placeholder={course.description}
                    label="New Description"
                    variant="outlined"
                />
                <br />
                <TextField
                    style={{
                        margin: "6px",
                        width: "250px",
                    }}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                    placeholder={course.price}
                    label="New Price"
                    variant="outlined"
                />
                <br />
                <TextField
                    style={{
                        margin: "6px",
                        width: "250px",
                    }}
                    onChange={(e) => {
                        setImageLink(e.target.value);
                    }}
                    variant="outlined"
                    label="New Image Link"
                    placeholder={course.imageLink}
                />
                <br />
                <FormControlLabel
                    style={{
                        marginLeft: "12px",
                    }}
                    control={<Switch />}
                    label="Publish"
                    labelPlacement="start"
                    onChange={(e) => {
                        setPublished(e.target.checked);
                    }}
                />
                <br />
                <Button
                    style={{
                        margin: "12px",
                        background: "#1b4332e6",
                    }}
                    variant="contained"
                    onClick={() => {
                        fetch(`http://localhost:3000/admin/courses/${courseId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + localStorage.getItem("adminToken"),
                            },
                            body: JSON.stringify({
                                title,
                                description,
                                imageLink,
                                price,
                                published
                            }),
                        }).then((res) =>
                            res.json().then((data) => {
                                fetchCourse(courseId);
                                alert(data.message);
                            })
                        );
                    }}
                >
                    Save Changes
                </Button>
                <Button
                    style={{
                        margin: "12px",
                        background: "#ba181b",
                    }}
                    variant="contained"
                    onClick={() => {
                        fetch(`http://localhost:3000/admin/courseDelete/${courseId}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("adminToken")
                            }
                        }).then(res => {
                            res.json().then(data => {
                                alert(data.message);
                                navigate(-1);
                            })
                        })
                    }}
                >
                    <DeleteIcon></DeleteIcon>
                </Button>
            </Card>
        </div>
    )
}
const courseState = atom({
    key: 'courseState',
    default: '',
});
export default AdminEditcourse;