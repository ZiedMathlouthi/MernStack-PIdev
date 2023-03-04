const User = require("../models/userModel");
const express = require("express");

exports.getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    users = users.map((user) => {
      const { password, ...otherdetails } = user._doc;
      return otherdetails;
    });
    res.status(200).json({ users });
  } catch (err) {
    // res.status(400).send({ msg: err.msg });
  }
};

exports.getAllNORMALUSER = async (req, res) => {
  try {
    let users = await User.find();
    users = users
      .filter((user) => user.role == "user")
      .map((user) => {
        const { password, ...otherdetails } = user._doc;
        return otherdetails;
      });
    res.status(200).json({ users });
  } catch (err) {
    // res.status(400).send({ msg: err.msg });
  }
};

exports.getAllCampanys = async (req, res) => {
  try {
    let users = await User.find();
    users = users
      .filter((user) => user.role == "campany")
      .map((user) => {
        const { password, ...otherdetails } = user._doc;
        return otherdetails;
      });
    res.status(200).json({ users });
  } catch (err) {
    // res.status(400).send({ msg: err.msg });
  }
};

exports.getAllExperts = async (req, res) => {
  try {
    let users = await User.find();
    users = users
      .filter((user) => user.role == "expert")
      .map((user) => {
        const { password, ...otherdetails } = user._doc;
        return otherdetails;
      });
    res.status(200).json({ users });
  } catch (err) {
    // res.status(400).send({ msg: err.msg });
  }
};
