/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const {
  unauthorizedError,
  badRequestCreateUserError,
  conflictingRequestError,
  badRequestDefaultError,
  signoutMessageText,
} = require('../utils/constants');

const SALT_ROUNDS = 10;
const { SECRET_STRING } = require('../utils/config');

const signout = (req, res, next) => {
  res.clearCookie('jwt').send({ message: signoutMessageText });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw unauthorizedError;
      }
      bcrypt.compare(password, user.password)
        .then((isValidPassword) => {
          if (!isValidPassword) {
            throw unauthorizedError;
          } else {
            const token = jwt.sign({ id: user._id }, SECRET_STRING);
            res
              .cookie('jwt', token, {
                maxAge: 3600000 * 24 * 7,
                httpOnly: true,
                sameSite: true,
              })
              .send({ id: user._id });
          }
        }).catch(next);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS, (error, hash) => {
    User.create({
      name, email, password: hash,
    })
      .then((data) => {
        res
          .status(201)
          .send({
            name, email,
          });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(badRequestCreateUserError);
        } else if (err.code === 11000) {
          next(conflictingRequestError);
        } else {
          next(err);
        }
      });
  });
};

const getAuthUser = (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const changeProfileData = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user.id,
    req.body,
    {
      new: true,
    },
  )
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(badRequestDefaultError);
      } else if (err.code === 11000) {
        next(conflictingRequestError);
      } else {
        next(err);
      }
    });
};

module.exports = {
  signin,
  createUser,
  changeProfileData,
  getAuthUser,
  signout,
};
