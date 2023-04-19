const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  addCompanyRating,
  addUserRating,
  getCompanyAverageRating,
  getListOfCompanyRatings,
  getUserAverageRating,
  getListOfUserRatings,
  getRating,
} = require("../controller/controller.ratings");

// Route pour ajouter une note à une entreprise
router.post(
  "/company/:id/ratings",
  [
    check("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("La note doit être entre 1 et 5."),
    check("comment")
      .isLength({ max: 500 })
      .withMessage("Le commentaire ne doit pas dépasser 500 caractères."),
  ],
  addCompanyRating
);

// Route pour ajouter une note à un utilisateur
router.post(
  "/user/:id/ratings",
  [
    check("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("La note doit être entre 1 et 5."),
    check("comment")
      .isLength({ max: 500 })
      .withMessage("Le commentaire ne doit pas dépasser 500 caractères."),
  ],
  addUserRating
);

// Route pour récupérer la moyenne des notes de l'entreprise
router.get("/company/:id/average", getCompanyAverageRating);
router.get("/user/:id/average", getUserAverageRating);
router.get("/company/:id/ratings", getListOfCompanyRatings);
router.get("/user/:id/ratings", getListOfUserRatings);
router.get("/Rate/:id", getRating);

module.exports = router;
