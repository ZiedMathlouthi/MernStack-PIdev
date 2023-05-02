import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

import "./chapterPopup.css"
import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

const ChapterComponent = (props) => {

    const idCourse = useParams().id; 
    const [chapter, setChapter] = useState(null);
    const [paragraphTitle, setParagTitle] = useState("");
//this state is for the chapter that we want to add as new chapter
    const [addedNewChapter, setAddedNewChapter] = useState({
        courseId: idCourse,
        chapterTitle: "",
        chapterParagraphs: [{
            paragraphTitle: "",
            paragraphContent: "",
            paragraphVideos: null,
            paragraphImages: null,
        }]
    });

//this fct is used to REFRESH the page
    const refreshPage = () => {
        window.location.reload(false);
    };

//this useEffect is used to fetch the data of chapter from props
    useEffect(() => {
        setChapter(props.chapter);
        // if(chapter){
        //     console.log(chapter.chapterTitle)
        // }
    },[props.chapter]);

//this fct is to handle the chapter title input changes
    const handleChapterTitleInput = (event) => {
        chapter.chapterTitle = event.target.value;
    };
    const handleNewChapterTitleInput = (event) => {
        addedNewChapter.chapterTitle = event.target.value;
    };

//this fct is used to handle the changes in the paragraph TITLE with the indexP
    const handleParagrapheTitleInputChange = (event, indexP) => {
        chapter.chapterParagraphs[indexP].paragraphTitle = event.target.value;
    };
    const handleNewParagrapheTitleInputChange = (event, indexP) => {
        addedNewChapter.chapterParagraphs[indexP].paragraphTitle = event.target.value;
    }

//this fct is used to handle the changes in the paragraph CONTENT with the indexP
    const handleParagrapheContentInputChange = (event, indexP) => {
        chapter.chapterParagraphs[indexP].paragraphContent = event.target.value;
    };
    const handleNewParagrapheContentInputChange = (event, indexP) => {
        addedNewChapter.chapterParagraphs[indexP].paragraphContent = event.target.value;
    };

//this fct is used to handle the changes in the paragraph IMAGE with the indexP
    const onImageChange = (event, indexP) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            chapter.chapterParagraphs[indexP].paragraphImages = img;
        }
        
    };
    const onNewImageChange = (event, indexP) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            addedNewChapter.chapterParagraphs[indexP].paragraphImages = img;
        }
    };

//this fct is used to handle the changes in the paragraph VIDEO with the indexP
    const onVideoChange = (event, indexP) => {
        if(event.target.files && event.target.files[0]){
            let vid = event.target.files[0];
            chapter.chapterParagraphs[indexP].paragraphVideos = vid;
        };
    };
    const onNewVideoChange = (event, indexP) => {
        if(event.target.files && event.target.files[0]){
            let vid = event.target.files[0];
            addedNewChapter.chapterParagraphs[indexP].paragraphVideos = vid;
        };
    };

//this fct is used to add a new EMPTY paragraph AND ADDED to the array so it can be Displayed
    const handleAddParag = () => {
        let newParag = {
            paragraphTitle: "",
            paragraphContent: "",
            paragraphVideos: null,
            paragraphImages: null,
        };
        props.chapter.chapterParagraphs.push(newParag);
        console.log(chapter)
    };
    const handleNewAddParag = () => {
        let newParag = {
            paragraphTitle: "",
            paragraphContent: "",
            paragraphVideos: null,
            paragraphImages: null,
        };
        addedNewChapter.chapterParagraphs.push(newParag);
    }

//THIS METHOD HAS BUGG
//always delete the last one
    const handleDeleteParag = (event, indexP) => {
        chapter.chapterParagraphs.splice(indexP,1);
    };
    const handleNewDeleteParag = (event, indexP) => {
        addedNewChapter.chapterParagraphs.splice(indexP,1);
    };

//STILL ON WORK
//this is the submit method called when the button submit is triggered
    const handleSubmit = async () => {
        console.log("Button Edit Chapter submit is triggered and this is the chapter object");
        console.log(chapter);
        await axios.put("http://127.0.0.1:9000/courses/updateChapter", chapter).then(
            (result) => { refreshPage(); }
        ).catch(
            (error) => {console.log(error)}
        )
    }
    const handleNewSubmit = async () => {
        console.log("Button Add New Chapter submit is triggered and this is the chapter object");
        console.log(addedNewChapter);
        await axios.post("http://127.0.0.1:9000/courses/addChapter", addedNewChapter).then(
            (result) => { refreshPage(); }
        ).catch(
            (error) => { console.log(error) }
        )
        // refreshPage();
    }

// console.log(addedNewChapter)

//STILL ON WORK
//if newChapter is true we return this as a component
    if(props.newChapter){
        return(props.trigger) ? (
            <div className="popup">
                <div className="popup-inner">
                    <Button style={{marginLeft:"542px"}} className="clonse-btn" onClick={() => props.setTrigger(false)}>x</Button>
                    <Card>
                        <Col lg="13">
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h2 className="card-title">Add new Chapter</h2>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form id="myForm" encType="multipart/form-data">
                                    <Form.Group className="form-group">
                                        <TextField
                                            // error={requiredTitleCourseField}
                                            id="outlined-basic"
                                            label={`chapter title`}
                                            name={`chapterTitle`}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => handleNewChapterTitleInput(e)}
                                            required
                                        />
                                        <Divider
                                            style={{ margin: "13px 1px" }}
                                            variant="middle"
                                        />
                                        {addedNewChapter.chapterParagraphs.map((parag, indexParag) => (
                                            <>
                                            <div style={{marginLeft:"0px"}}>
                                                <TextField
                                                    style={{marginBottom:"13px"}}
                                                    id="outlined-basic"
                                                    label={`Paragraph ${indexParag + 1} title`}
                                                    name="paragraphTitle"
                                                    variant="outlined"
                                                    onChange={(e) =>
                                                        handleNewParagrapheTitleInputChange(
                                                        e,
                                                        indexParag
                                                        )
                                                    }
                                                    required
                                                />
                                                <Button style={{marginLeft:"280px"}} variant="danger" className="rounded-pill mb-1"
                                                onClick={(e)=>handleNewDeleteParag(e,indexParag)}>Delete</Button>{' '}
                                            </div>
                                            <TextField
                                                id="outlined-basic"
                                                label={`Paragraph ${indexParag + 1} textarea`}
                                                multiline
                                                rows={4}
                                                fullWidth
                                                name="paragraphContent"
                                                variant="outlined"
                                                onChange={(e) =>
                                                    handleNewParagrapheContentInputChange(
                                                    e,
                                                    indexParag
                                                    )
                                                }
                                                required
                                            />
                                            <Form.Group className="form-group">
                                                <Form.Label style={{marginLeft:"-438px"}} className="custom-file-input">
                                                    Paragraph Image
                                                </Form.Label>{" "}
                                                <Form.Control
                                                    name="paragraphImages"
                                                    type="file"
                                                    id="image"
                                                    onChange={(e)=>onNewImageChange(e, indexParag)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label style={{marginLeft:"-438px"}} className="custom-file-input">
                                                    Paragraph Video
                                                </Form.Label>{" "}
                                                <Form.Control
                                                    name="paragraphVideos"
                                                    type="file"
                                                    id="video"
                                                     onChange={(e)=> onNewVideoChange(e, indexParag)}
                                                />
                                            </Form.Group>
                                            <Divider
                                                style={{ margin: "15px 1px" }}
                                                variant="middle"
                                            />

                                            </>
                                        ))}
                                    </Form.Group>
                                </Form>
                                <Button style={{marginLeft:"-350px"}} variant="outline-primary" className="rounded-pill mb-1" onClick={handleNewAddParag}>Add Paragraph</Button>{' '}
                                <Divider
                                    style={{ margin: "15px 1px" }}
                                    variant="middle"
                                />
                                <div style={{marginLeft:"320px"}}>
                                    <Button variant="outline-danger" className="rounded-pill mb-1" onClick={() => props.setTrigger(false)}>Cancel</Button>{' '}

{/** this is the button of the submit STILL ON WORK */}
                                    <Button variant="outline-success" className="rounded-pill mb-1" onClick={handleNewSubmit}>Submit</Button>{' '}
                                </div>
                            </Card.Body>
                        </Col>
                    </Card>
                </div>
            </div>
        ): "";
//else if newChapter is false then return the edit component
    }else{
        return (props.trigger) ?  (
            <div className="popup">
                <div className="popup-inner">
                    <Button style={{marginLeft:"542px"}} className="clonse-btn" onClick={() => props.setTrigger(false)}>x</Button>
                    <Card>
                        <Col lg="13">
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h2 className="card-title">EDIT {props.chapter.chapterTitle}</h2>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form id="myForm" encType="multipart/form-data">
                                    <Form.Group className="form-group">
                                        <TextField
                                            // error={requiredTitleCourseField}
                                            id="outlined-basic"
                                            label={`chapter title`}
                                            defaultValue={props.chapter.chapterTitle}
                                            name={`chapterTitle${props.indexChapter}`}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => handleChapterTitleInput(e)}
                                            required
                                        />
                                        <Divider
                                            style={{ margin: "13px 1px" }}
                                            variant="middle"
                                        />
                                        {props.chapter.chapterParagraphs.map((parag, indexParag) => (
                                            <>
                                            <div style={{marginLeft:"0px"}}>
                                                <TextField
                                                    style={{marginBottom:"13px"}}
                                                    id="outlined-basic"
                                                    label={`Paragraph ${indexParag + 1} title`}
                                                    defaultValue={parag.paragraphTitle}
                                                    name="paragraphTitle"
                                                    variant="outlined"
                                                    onChange={(e) =>
                                                        handleParagrapheTitleInputChange(
                                                        e,
                                                        indexParag
                                                        )
                                                    }
                                                    required
                                                />
                                            <Button style={{marginLeft:"280px"}} variant="danger" className="rounded-pill mb-1"
                                                onClick={(e)=>handleDeleteParag(e,indexParag)}>Delete</Button>{' '}
                                            </div>
                                            <TextField
                                                id="outlined-basic"
                                                label={`Paragraph ${indexParag + 1} textarea`}
                                                multiline
                                                rows={4}
                                                fullWidth
                                                name="paragraphContent"
                                                variant="outlined"
                                                defaultValue={parag.paragraphContent}
                                                onChange={(e) =>
                                                    handleParagrapheContentInputChange(
                                                    e,
                                                    indexParag
                                                    )
                                                }
                                                required
                                            />
                                            <Form.Group className="form-group">
                                                <Form.Label style={{marginLeft:"-438px"}} className="custom-file-input">
                                                    Paragraph Image
                                                </Form.Label>{" "}
                                                <Form.Control
                                                    name="paragraphImages"
                                                    type="file"
                                                    id="image"
                                                    onChange={(e)=>onImageChange(e, indexParag)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label style={{marginLeft:"-438px"}} className="custom-file-input">
                                                    Paragraph Video
                                                </Form.Label>{" "}
                                                <Form.Control
                                                    name="paragraphVideos"
                                                    type="file"
                                                    id="video"
                                                     onChange={(e)=> onVideoChange(e, indexParag)}
                                                />
                                            </Form.Group>
                                            <Divider
                                                style={{ margin: "15px 1px" }}
                                                variant="middle"
                                            />
                                            </>
                                        ))}
                                    </Form.Group>
                                </Form>
                                <Button style={{marginLeft:"-350px"}} variant="outline-primary" className="rounded-pill mb-1" onClick={handleAddParag}>Add Paragraph</Button>{' '}
                                <Divider
                                    style={{ margin: "15px 1px" }}
                                    variant="middle"
                                />
                                <div style={{marginLeft:"320px"}}>
                                    <Button variant="outline-danger" className="rounded-pill mb-1" onClick={() => props.setTrigger(false)}>Cancel</Button>{' '}

{/** this is the button of the submit STILL ON WORK */}
                                    <Button variant="outline-success" className="rounded-pill mb-1" onClick={handleSubmit}>Submit</Button>{' '}
                                </div>
                                </Card.Body>
                        </Col>
                    </Card>
                </div>
            </div>
        ): "";
    }
    
}

export default ChapterComponent;