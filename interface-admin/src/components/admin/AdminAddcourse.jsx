import { Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function AdminAddcourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [price, setPrice] = useState("");
    const [published, setPublished] = useState(false);
    const navigate = useNavigate();
    const authHeader = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      };
    return (
        <div>
            <div
                style={{
                    marginTop: "100px",
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
                        Create new course !
                    </Typography>
                    <TextField
                        style={{
                            margin: "6px",
                            width: "250px",
                        }}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        label="Title"
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
                        label="Description"
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
                        label="Price"
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
                        label="Image Link"
                        variant="outlined"
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
                            margin: "20px 86px 0px",
                            width: "120px",
                            background: "#1b4332e6",
                        }}
                        variant="contained"
                        onClick={async () => {
                            const response = await axios.post("http://localhost:3000/admin/courses", {
                                title,
                                description,
                                imageLink,
                                price,
                                published
                            },authHeader)
                            let data = response.data;
                            alert(data.message);
                            navigate("/courses");
                        }}
                    >
                        Add
                    </Button>
                </Card>
            </div>
        </div>
    );
}
export default AdminAddcourse;
