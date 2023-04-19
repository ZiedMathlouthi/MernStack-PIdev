import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Col, Row, Alert } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const RatingsComponentUser = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [averageRating, setAverageRating] = useState(null);
  const [userRatings, setUserRatings] = useState([]);
  const [userRatingsData, setUserRatingsData] = useState(null);
  const UserId = useParams();
  const currentConnectedUser = JSON.parse(localStorage.getItem("myData")).user;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/ratings/user/${UserId.id}/average`)
      .then((response) => {
        setAverageRating(response.data.averageRating);
      })
      .catch((error) => console.error(error.message));

    axios
      .get(`http://localhost:9000/ratings/user/${UserId.id}/ratings`)
      .then((response) => {
        setUserRatings(response.data);
      })
      .catch((error) => console.error(error.message));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const p = userRatings.map((r) => {
        return axios.get(`http://localhost:9000/ratings/Rate/${r}`);
      });
      const ratingResponsive = await Promise.all(p);
      const ratingData = ratingResponsive.map((w) => (w.data ? w.data : null)); // Ajouter une vérification pour les données vides
      if (ratingData !== [] && ratingData) {
        setUserRatingsData(ratingData);
      }
    };
    fetchData();
  }, [userRatings]); // Ajouter le tableau de dépendances

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
      .post(`http://localhost:9000/ratings/user/${UserId.id}/ratings`, {
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
          <h2>Noter cet utilisateur</h2>
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
          <h3>Liste des notes pour cet utilisateur :</h3>
          {userRatings.length > 0 ? (
            <ListGroup>
              {userRatingsData &&
                userRatingsData.map((rating, index) => (
                  <ListGroup.Item key={index}>
                    <div>Note : {rating.rating}</div>
                    <div>Commentaire : {rating.comment}</div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          ) : (
            <p>Aucune note pour cet utilisateur.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RatingsComponentUser;
