import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";

import TextField from "@mui/material/TextField";

const AddCoursePage = () => {

    const navigate = useNavigate();
    const userData = localStorage.getItem("myData");
    const token = JSON.parse(userData).token;
    const user = JSON.parse(userData).user;
    const API_Url = "http://127.0.0.1:9000/courses/";
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
    };


    const [requiredTitleCourseField, setRequiredTitleCourseField] = useState(false);
    const [requiredDescriptionCourseField, setRequiredDescriptionCourseField] = useState(false);

    const [courseData, setCourseData] = useState({
        courseName: "",
        courseDescription: "",
        courseContent: [],
        coursePhoto: "",
        courseOwner: user._id,
    });


    const handleCourseInputChange = (event) => {
        const { name, value } = event.target;
        setCourseData({
            ...courseData,
            [name]: value,
        });
        if(name === "courseName"){
            setRequiredTitleCourseField(false);
        }else if(name === "courseDescription"){
            setRequiredDescriptionCourseField(false);
        }

    };
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setCourseData({
                ...courseData,
                coursePhoto: img,
            });
        }
    };
    const submitData = (event) => {
        const myForm = document.getElementById("myForm");
        if (myForm.checkValidity()) {
            axios
                .post(API_Url + "addCourseTemplate", courseData, config)
                .then((result) => {
                    if(result.status === 200){
                        navigate("/courseDashboard/"+result.data._id)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setRequiredTitleCourseField(true);
            setRequiredDescriptionCourseField(true);
        }
    };


    console.log(courseData)
    return(
        <>
        <div id="content-page" className="content-page">
            <Container>
                <Row>
                    <Card>
                        <Col lg="12">
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h2 className="card-title">General Information About The Course</h2>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form id="myForm" encType="multipart/form-data">
                                    <Form.Group className="form-group">
                                        <TextField
                                            error={requiredTitleCourseField}
                                            id="outlined-basic"
                                            label="Course Title"
                                            name="courseName"
                                            fullWidth
                                            variant="outlined"
                                            required
                                            onChange={handleCourseInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <TextField
                                            error={requiredDescriptionCourseField}
                                            style={{marginTop:"30px"}}
                                            id="outlined-multiline-static"
                                            label="Course description"
                                            name="courseDescription"
                                            multiline
                                            fullWidth
                                            rows={8}
                                            required
                                            onChange={handleCourseInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group style={{marginTop:"30px"}} className="form-group">
                                        <Form.Label className="custom-file-input">
                                            Course Image
                                        </Form.Label>{" "}
                                        <Form.Control
                                            name="coursePhoto"
                                            type="file"
                                            id="courseImage"
                                            onChange={onImageChange}
                                        />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Col>
                        <Button
                            style={{marginTop:"60px"}}
                            variant="outline-success"
                            className="rounded-pill mb-1"
                            onClick={(event) => submitData(event)}
                            >Next</Button>{' '}
                        <Button
                            variant="outline-danger"
                            className="rounded-pill mb-1"
                            onClick={(e)=>navigate("/")}
                            >Cancel</Button>{' '}
                    </Card>
                </Row>
            </Container>
            </div>
        </>
    );

};

export default AddCoursePage;