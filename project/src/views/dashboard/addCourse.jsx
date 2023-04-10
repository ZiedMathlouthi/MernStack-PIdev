import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import axios from 'axios';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddCourseComponent = () => {
    const userData = localStorage.getItem('myData');
    const token = JSON.parse(userData).token;
    const user = JSON.parse(userData).user;
    const API_Url = 'http://127.0.0.1:9000/courses/';
    const config = {
        headers: { Authorization: `Bearer ${token}`}
    };

    const [alertVisibility, setAlertVisibility] = useState(false);
    const [requiredField, setrequiredField] = useState(false);
    const [chapterTitleData, setChapterTitleData] =useState('');
    const [courseContentData, setCourseContentData] = useState([]); //mazelet fel submit nguedha
    const [chapterParagraphsData, setchapterParagraphsData] =useState([]); //mazelet fel submit nguedha
    const [paragraphTitleData, setparagraphTitle] = useState('');
    const [paragraphContentData, setparagraphContentData] =useState('');
    const [courseData, setCourseData] = useState({
        courseName: '',
        courseDescription: '',
        courseContent: [
        {
            chapterTitle: '',
            chapterParagraphs: [
            {
                paragraphTitle: '',
                paragraphContent: '',
                paragraphVideos: null,
                paragraphImages: null,
            },
            ],
        },
        ],
        coursePhoto: null,
        courseOwner: user._id,
    });

    const handleClose = (event, reason) => {
        if(reason === "clickaway"){
            return;
        }
        setAlertVisibility(false);
    }
    const handleAddChapter = () => {
        let newChapter = {
            chapterTitle: '',
            chapterParagraphs: [
            {
                paragraphTitle: '',
                paragraphContent: '',
                paragraphVideos: null,
                paragraphImages: null,
            },
            ],
        };
        let courseContentArray = courseData.courseContent;
        courseContentArray.push(newChapter);
        setCourseData({...courseData, courseContent: courseContentArray})
    }
    const handleAddParagraph = (indexChapter) => {
        let newParag = {
            paragraphTitle: '',
            paragraphContent: '',
            paragraphVideos: null,
            paragraphImages: null,
        };
        courseData.courseContent[indexChapter].chapterParagraphs.push(newParag);
        setCourseData({...courseData, courseContent: courseData.courseContent})
    }

    const handleDeleteChapter = (index) => {
        console.log(index)
        let courseContentArray = courseData.courseContent;
        courseContentArray.splice(index,1);
        setCourseData({...courseData, courseContent: courseContentArray});
        setChapterTitleData('');
    }
    const handleCourseInputChange = (event) => {
        const {name,value} = event.target;
        setCourseData({
            ...courseData,
            [name]:value
        });
    }
    const handleChapterTitleInputChange = (event, index) => {
        let chaptersArray = courseData.courseContent;
        setChapterTitleData(event.target.value);
        chaptersArray[index].chapterTitle = chapterTitleData;
    }
    const handleParagrapheTitleInputChange = (event, indexChapter, indexParag) => {
        let paragsArray = courseData.courseContent[indexChapter].chapterParagraphs;
        setparagraphTitle(event.target.value);
        paragsArray[indexParag].paragraphTitle = paragraphTitleData;
    }
    const handleParagrapheContentInputChange = (event, indexChapter, indexParag) => {
        let paragsArray = courseData.courseContent[indexChapter].chapterParagraphs;
        setparagraphContentData(event.target.value);
        paragsArray[indexParag].paragraphContent = paragraphContentData;
    }

    const submitData = (event) => {
        const myForm = document.getElementById("myForm");
        if( myForm.checkValidity() ) {
            axios.post(API_Url+"addCourse", courseData, config).then(
                (result) => {
                    console.log(result);
                    setAlertVisibility(true);
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )
            console.log(courseData);
            console.log(token)
        }else{
            console.log("form invalid")
            console.log(myForm)
        }
    }
        

    return (
        <>
            <div id='content-page' className='content-page'>

           <Container>
                <Row>
                    <Col lg="12">
                        <form id='myForm'>
                            <div>
                                <Typography gutterBottom variant="h3" component="div" align='center'>
                                    General info about the course
                                </Typography>
                                <Divider variant="middle" />
                                <br/>
                                <br/>
                                <br/>
                                <TextField 
                                    error={requiredField}
                                    id="outlined-basic" 
                                    label="Course Title" 
                                    name='courseName'
                                    fullWidth
                                    variant="outlined" 
                                    onChange={handleCourseInputChange}
                                    required
                                />
                            </div>
                            <br/>
                            <TextField
                                    id="outlined-multiline-static"
                                    label="Course description"
                                    name='courseDescription'
                                    multiline
                                    fullWidth
                                    rows={8}
                                    required
                                    onChange={handleCourseInputChange}
                            />
                            <br/><br/>
                            <TextField
                                    type="file"
                                    name='coursePhoto'
                                    label="Course Image"
                                    onChange={handleCourseInputChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                            />

                            <br/>
                            <br/>
                            <Divider variant="middle" />
                            <Typography gutterBottom variant="h3" component="div" align='center'>
                                Chapters
                            </Typography>
                            <Divider variant="middle" />
                            <br/>
                            <br/>


                            <div>
                                {courseData.courseContent.map((_,indexChapter)=>(
                                    <>
                                    <TextField
                                        id="outlined-basic" 
                                        label={`chapter ${indexChapter+1} title`}
                                        name={`chapterTitle${indexChapter}`}
                                        fullWidth
                                        variant="outlined" 
                                        onChange={(e)=>handleChapterTitleInputChange(e,indexChapter)}
                                        required
                                    />

                                    
                                    <br/><br/>


                                    {_.chapterParagraphs.map((_,indexParag)=>(
                                        <>
                                        <br/><br/>
                                        <TextField
                                            id="outlined-basic" 
                                            label={`Paragraph ${indexParag+1} title`}
                                            name='paragraphTitle'
                                            variant="outlined" 
                                            onChange={(e)=>handleParagrapheTitleInputChange(e,indexChapter,indexParag)}
                                            required
                                        />
                                        <br/><br/>
                                        <TextField
                                            id="outlined-basic" 
                                            label={`Paragraph ${indexParag+1} textarea`}
                                            multiline
                                            rows={6}
                                            fullWidth
                                            name='paragraphContent'
                                            variant="outlined" 
                                            onChange={(e)=>handleParagrapheContentInputChange(e,indexChapter,indexParag)}
                                            required
                                        />
                                        <br/><br/>
                                        <TextField
                                            type="file"
                                            label="Paragraph Image"
                                            name='paragraphImages'
                                            // onChange={(e)=>handleFileInputChange(e,"paragraphImages",indexChapter,indexParag)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <br/><br/>
                                        <TextField
                                            type="file"
                                            label="Paragraph Video"
                                            name='paragraphVideos'
                                            // onChange={(e)=>handleFileInputChange(e,"paragraphVideos",indexChapter,indexParag)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        </>
                                    ))}
                                    <br/><br/>

                                    <Button 
                                        key={indexChapter+1} 
                                        variant="contained" 
                                        startIcon={<AddIcon />} 
                                        onClick={(event) => handleAddParagraph(indexChapter)}
                                    >
                                        Add Paragraph
                                    </Button>
                                    <Button 
                                        key={indexChapter} 
                                        variant="outlined" 
                                        startIcon={<DeleteIcon />} 
                                        onClick={(event) => handleDeleteChapter(indexChapter)}
                                    >
                                        Delete
                                    </Button>
                        
                                    <br/><br/><br/><br/>
                                    <Divider variant="middle" />
                                    <br/><br/>
                                    </>
                                    
                                    
                                ))}
                            </div>
    <br/><br/>
                                <Stack spacing={2} sx={{ width: '40%' }}>
                                <Button variant="contained" startIcon={<AddIcon />} 
                                onClick={handleAddChapter}
                                >
                                    Add chapter
                                </Button>
                                    <Button 
                                        variant="contained" 
                                        startIcon={< SendIcon/>} 
                                        onClick={(event) => submitData(event)}
                                    >
                                            submit
                                    </Button>
                                    <Snackbar open={alertVisibility} autoHideDuration={6000} onClose={handleClose} >
                                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                            Course added successfully
                                        </Alert>
                                    </Snackbar>
                                </Stack>
                                    
                        </form>
                    </Col>
                </Row>
            </Container>
            </div>
        </>
    );
}

export default AddCourseComponent