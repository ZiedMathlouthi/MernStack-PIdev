import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Col, Row, Alert } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
const RatingsComponentCompany = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [averageRating, setAverageRating] = useState(null); // Ajout de la variable pour stocker la moyenne
  const [companyRatings, setCompanyRatings] = useState([]);
  const [companyRatingsData, setCompanyRatingsData] = useState(null);
  const CompanyId = useParams();
  const currentConnectedUser = JSON.parse(localStorage.getItem("myData")).user;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/ratings/company/${CompanyId.id}/average`)
      .then((response) => {
        setAverageRating(response.data.averageRating);
      })
      .catch((error) => console.error(error.message));

    // Appel de l'API pour récupérer la liste des notes de l'entreprise
    axios
      .get(`http://localhost:9000/ratings/company/${CompanyId.id}/ratings`)
      .then((response) => {
        setCompanyRatings(response.data);
      })
      .catch((error) => console.error(error.message));
  }, []);
  useEffect(() => {
    const fetchdata = async () => {
      const p = companyRatings.map((r) => {
        return axios.get(`http://localhost:9000/ratings/Rate/${r}`);
      });
      const ratingresponsive = await Promise.all(p);
      const ratingdata = ratingresponsive.map((w) => w.data);
      if (ratingdata !== [] && ratingdata) {
        setCompanyRatingsData(ratingdata);
      }
    };
    fetchdata();
  }, [companyRatings]);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const ratingValue = parseFloat(rating);
    axios
      .post(`http://localhost:9000/ratings/company/${CompanyId.id}/ratings`, {
        rating: ratingValue,
        comment: comment,
        user: currentConnectedUser._id,
      })
      .then((response) => {
        setMessage(response.data.message);
        setRating(0);
        setComment("");
        setError("");
      })
      .catch((error) => {
        console.log(error);
        setMessage("");
        setError("Erreur serveur.");
      });
  };
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Noter cette entreprise</h2>
          {averageRating !== null && (
            <div>Moyenne des notes : {averageRating}</div>
          )}
          <Form onSubmit={handleSubmit}>
            <Rating
              name="rating"
              value={rating}
              onChange={handleRatingChange}
              size="large"
              precision={0.5}
              sx={{ color: "#ffc107" }}
            />
            <Form.Group controlId="comment">
              <Form.Label>Commentaire :</Form.Label>
              <Form.Control
                as="textarea"
                value={comment}
                onChange={handleCommentChange}
                rows="3"
                required
              />
            </Form.Group>
            <Button type="submit">Envoyer</Button>
            <Button
              style={{ marginLeft: "10px" }}
              type="button"
              onClick={handleCancel}
            >
              Annuler
            </Button>
          </Form>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <h3>Liste des notes pour cette entreprise :</h3>
          {companyRatings.length > 0 ? (
            <ListGroup>
              {companyRatingsData &&
                companyRatingsData.map((rating, index) => (
                  <ListGroup.Item key={index}>
                    <div>Note : {rating.rating}</div>
                    <div>Commentaire : {rating.comment}</div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          ) : (
            <p>Aucune note pour cette entreprise.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RatingsComponentCompany;
