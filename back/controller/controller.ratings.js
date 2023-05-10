const mongoose = require("mongoose");

const Course = require("../models/courses/model.course")
const User = require("../models/model.user");
const Company = require("../models/model.company");
const Rating = require("../models/model.rating");
// Liste de toutes les notes pour les utilisateurs
let listOfRatesUser = [];
// Liste de toutes les notes pour les entreprises
let listOfRatesCompany = [];

// Fonction pour ajouter une note à une entreprise
exports.addCompanyRating = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Entreprise introuvable." });
    }
    console.log(company);
    const rating = new Rating({
      subject: "company",
      subjectId: req.params.id,
      rater: req.body.user || req.body.company,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    const r = await rating.save();
    listOfRatesCompany = company.listofRates;
    listOfRatesCompany.push(r);
    await Company.findByIdAndUpdate(req.params.id, {
      listofRates: listOfRatesCompany,
    });

    // Ajouter la note à la liste des notes pour les entreprises

    res.status(201).json({ message: "Note ajoutée avec succès." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

exports.getListOfCompanyRatings = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    const l = company.listofRates;

    res.status(200).send(l);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
exports.getRating = async (req, res) => {
  try {
    const id = req.params.id;
    const rating = await Rating.findById(id);

    res.status(200).send(rating);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Fonction pour calculer la moyenne des notes d'une entreprise
exports.getCompanyAverageRating = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Entreprise introuvable." });
    }

    const ratings = await Rating.find({
      subject: "company",
      subjectId: req.params.id,
    });

    if (ratings.length === 0) {
      return res
        .status(400)
        .json({ message: "Aucune note pour cette entreprise." });
    }

    let totalRating = 0;
    ratings.forEach((rating) => {
      totalRating += rating.rating;
    });

    const averageRating = totalRating / ratings.length;

    res.status(200).json({ averageRating });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Fonction pour ajouter une note à un utilisateur
exports.addUserRating = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    const rating = new Rating({
      subject: "user",
      subjectId: req.params.id,
      rater: req.body.company || req.body.user,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    const r = await rating.save();
    listOfRatesUser = user.listofRates;
    listOfRatesUser.push(r);
    await User.findByIdAndUpdate(req.params.id, {
      listofRates: listOfRatesUser,
    });

    // Ajouter la note à la liste des notes pour l'utilisateur

    res.status(201).json({ message: "Note ajoutée avec succès." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Fonction pour obtenir la liste des notes d'un utilisateur
exports.getListOfUserRatings = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const l = user.listofRates;

    res.status(200).send(l);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// exports.getRating = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const rating = await Rating.findById(id);

//     res.status(200).send(rating);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Erreur serveur.' });
//   }
// }

// Fonction pour calculer la moyenne des notes d'un utilisateur
exports.getUserAverageRating = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    const ratings = await Rating.find({
      subject: "user",
      subjectId: req.params.id,
    });

    if (ratings.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucune note pour cet utilisateur." });
    }

    let totalRating = 0;
    ratings.forEach((rating) => {
      totalRating += rating.rating;
    });

    const averageRating = totalRating / ratings.length;

    res.status(200).json({ averageRating });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

//Adding khedma rate course : Integration en classe

// Fonction pour ajouter une note à un cours
exports.addCourseRating = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Cours introuvable." });
    }

    const userId = req.userId; // obtenir l'ID de l'utilisateur connecté
    const courseId = req.params.id;

    // // Vérifier si l'utilisateur a déjà noté ce cours
    // const hasRated = await userHasRatedCourse(userId, courseId);
    // if (hasRated) {
    //   return res.status(400).json({ message: "Vous avez déjà noté ce cours." });
    // }

    const rating = new Rating({
      subject: "course",
      subjectId: courseId,
      rater: req.body.user || req.body.company,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    const r = await rating.save();
    let listOfRatesCourse = course.listofRates || [];
    listOfRatesCourse.push(r);
    await Course.findByIdAndUpdate(courseId, {
      listofRates: listOfRatesCourse,
    });

    // Ajouter la note à la liste des notes pour les cours

    res.status(201).json({ message: "Note ajoutée avec succès." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

exports.getListOfCourseRatings = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    const l = course.listofRates;
    res.status(200).send(l);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Fonction pour calculer la moyenne des notes d'un cours
exports.getCourseAverageRating = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Cours introuvable." });
    }
    const ratings = await Rating.find({
      subject: "course",
      subjectId: req.params.id,
    });

    if (ratings.length === 0) {
      return res
        .status(400)
        .json({ message: "Aucune note pour ce cours." });
    }

    let totalRating = 0;
    ratings.forEach((rating) => {
      totalRating += rating.rating;
    });

    const averageRating = totalRating / ratings.length;

    res.status(200).json({ averageRating });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
