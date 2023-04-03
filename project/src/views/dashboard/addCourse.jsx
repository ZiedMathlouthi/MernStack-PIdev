import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { IndexKind } from 'typescript';

const AddCourseComponent = () => {
    const userData = localStorage.getItem('myData');
    const user = JSON.parse(userData).user;


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
        })
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

    console.log(courseData)
        

    return (
        <>
            <div id='content-page' className='content-page'>

           <Container>
                <Row>
                    <Col lg="12">
                        <div>
                            <Typography gutterBottom variant="h3" component="div" align='center'>
                                General info about the course
                            </Typography>
                            <Divider variant="middle" />
                            <br/>
                            <br/>
                            <br/>
                            <TextField 
                                id="outlined-basic" 
                                label="Course Title" 
                                name='courseName'
                                variant="outlined" 
                                onChange={handleCourseInputChange}
                                required
                            />
                            <TextField
                                type="file"
                                name='coursePhoto'
                                label="Course Image"
                                onChange={handleCourseInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <TextField
                                id="outlined-multiline-static"
                                label="Course description"
                                name='courseDescription'
                                multiline
                                rows={8}
                                required
                                onChange={handleCourseInputChange}
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
                                    variant="outlined" 
                                    onChange={(e)=>handleChapterTitleInputChange(e,indexChapter)}
                                    required
                                />


                                <br/><br/>


                                {_.chapterParagraphs.map((_,indexParag)=>(
                                    <>
                                    <TextField
                                        id="outlined-basic" 
                                        label={`Paragraph ${indexParag+1} title`}
                                        name='paragraphTitle'
                                        variant="outlined" 
                                        onChange={(e)=>handleParagrapheTitleInputChange(e,indexChapter,indexParag)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-basic" 
                                        label={`Paragraph ${indexParag+1} textarea`}
                                        name='paragraphContent'
                                        variant="outlined" 
                                        onChange={(e)=>handleParagrapheContentInputChange(e,indexChapter,indexParag)}
                                        required
                                    />
                                    <TextField
                                        type="file"
                                        label="Paragraph Image"
                                        name='paragraphImages'
                                        // onChange={(e)=>handleFileInputChange(e,"paragraphImages",indexChapter,indexParag)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
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
                            <Button key={indexChapter} variant="outlined" startIcon={<DeleteIcon />} 
                                onClick={(event) => handleDeleteChapter(indexChapter)}
                                >
                                    Delete
                                </Button>
                    
                                <br/><br/><br/><br/>
                                </>
                                
                                
                            ))}

<br/><br/><br/><br/>
                            <Button variant="contained" startIcon={<AddIcon />} 
                            onClick={handleAddChapter}
                            >
                                Add chapter
                            </Button>
                        </div>
                        <Button variant="contained" startIcon={<AddIcon />} 
                            // onClick={SubmitData}
                            >
                                console.log
                        </Button>
                    </Col>
                </Row>
            </Container>
            </div>
        </>
    );
}

export default AddCourseComponent