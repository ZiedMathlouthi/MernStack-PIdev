import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';


import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const ResultPage = () => {

    const navigate = useNavigate();
    const idTest = useParams().idTest;
    const idUser = useParams().idUser;

    const [resultObject, setResultObject] = useState(null);


//this useEffect for fetching the result of the Test
    useEffect(() => {
        const fetchResultData = async () => {
            await axios.get("http://127.0.0.1:9000/tests/getResult/"+idTest+"/"+idUser)
                .then( (result) => { setResultObject(result.data) } )
                .catch( (error) => { console.log(error) } )
        };

        fetchResultData();
    },[]);
    console.log(resultObject)


//if the resultObject is fetched
    if(resultObject){
        return(resultObject.didUserPassTest) ? (
            <>
            <div id='content-page' className='content-page'>
                <Container>
                    <Row>
                        <Col sm="200" lg="25">
                            <Card>
                                <Card.Header>
                                    <h1>
                                        Test Result : text here
                                    </h1>
                                </Card.Header>
                                {/** this is the bar of next and back */}
                                <MobileStepper
                                    style={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    variant="progress"
                                    steps={10} //lahne l nombre de questions 
                                    position="static"
                                    activeStep={9} //lahne tzid +1 kol next button submited
                                />
                                {/** ends here */}
                                <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title as="h2" style={{textAlign: "center"}}>Congrats</Card.Title>
                                    <Card.Text>Congrats on nailing the test with a score of <b>{resultObject.testResult}%</b> Correct Answers. You can download your Certificate by clicking bellow. CODE FOR LIFE !!</Card.Text>
                                    <div style={{marginLeft:"270px"}}>
                                        <Button variant="primary" onClick={(e) => navigate("/downloadPDF")} style={{marginRight:"10px"}} to="#" className="btn btn-primary btn-block">download Certificate</Button>
                                        <Button variant="primary" onClick={(e) => navigate("/")} className="btn btn-primary btn-block">Go back Home</Button>
                                    </div>
                                    </Card.Body>
                                </Card>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            </>
        ): (
            <>
            <div id='content-page' className='content-page'>
                <Container>
                    <Row>
                        <Col sm="200" lg="25">
                            <Card>
                                <Card.Header>
                                    <h1>
                                        Test Result : text here
                                    </h1>
                                </Card.Header>
                                {/** this is the bar of next and back */}
                                <MobileStepper
                                    style={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    variant="progress"
                                    steps={10} //lahne l nombre de questions 
                                    position="static"
                                    activeStep={9} //lahne tzid +1 kol next button submited
                                />
                                {/** ends here */}
                                <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title as="h2" style={{textAlign: "center"}}>Good Job</Card.Title>
                                    <Card.Text>We are SORRY to inform you that you failed the test. You only got <b>{resultObject.testResult}%</b> of the answers. You can retry at any time, KEEP CODING !!!</Card.Text>
                                    <div style={{marginLeft:"270px"}}>
                                        <Button variant="primary" onClick={(e) => navigate("/dashboard/app/profile-forum")} style={{marginRight:"10px"}} to="#" className="btn btn-primary btn-block">go to tests list</Button>
                                        <Button variant="primary" onClick={(e) => navigate("/")} className="btn btn-primary btn-block">Go back Home</Button>
                                    </div>
                                    </Card.Body>
                                </Card>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            </>
        )
//if the resultObject still not fetched from database
    }else{
        <Container>
            <div style={{margin:"250px 350px"}}>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>
            <div style={{textAlign:"center"}}>
                <h2>if the LOADING took too long.. Go <Link to={"/home"}>Home</Link></h2>
            </div>
        </Container>
    }
};


export default ResultPage;