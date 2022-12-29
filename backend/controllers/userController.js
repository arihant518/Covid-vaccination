const userModel = require("../models/userModel");
const centerModel = require("../models/centerModel");
const { promisify } = require("util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { resourceLimits } = require("worker_threads");

const signToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY);
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(403).send({ msg: "Please Login" });
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  const user = await userModel.findById(decoded._id);
  req.user = user;
  next();
};
exports.restrictTo = (roles) => {
  return (req, res, next) => {
   
   
    if (!roles.includes(req.user.type)) {
      return res.status(403).send({ msg: "Not authorized" });
    }
    next();
  };
};

// User Registration to database
exports.regUser = (req, res) => {
  // Password hashing
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      res.status(403).send({ msg: "Something went wrong. Try again later." });
    } else {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          res
            .status(403)
            .send({ msg: "Something went wrong. Try again later." });
        } else {
          userModel.findOne({ email: req.body.email }).then((result) => {
            if (result) {
              res.status(403).send({ msg: "User already registered." });
            } else {
              userModel
                .create({
                  name: req.body.name,
                  email: req.body.email,
                  password: hash,
                })
                .then((result) => {
                  const token = signToken(result._id);
                  res.status(200).send({
                    msg: "User registered successfully.",
                    user: result,
                    token,
                  });
                })
                .catch((err) => {
                  res.status(403).send({ msg: "Something went wrong." });
                });
            }
          });
        }
      });
    }
  });
};

// User login
exports.loginUser = (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .then((result) => {
      if (!result) {
        res.status(403).send({ msg: "User not found." });
      } else {
        const token = signToken(result._id);
        bcrypt.compare(req.body.password, result.password, (err, status) => {
          if (err) {
            res.status(403).send({ msg: "Something went wrong." });
          } else {
            if (status === true) {
              res.status(200).send({
                msg: "User logged in successfully.",
                user:result,
                token,
              });
            } else {
              res.status(403).send({ msg: "Incorrect password." });
            }
          }
        });
      }
    })
    .catch((err) => {
      res.status(400).send({ msg: "Something went wrong." });
    });
};

exports.getAllCenters = (req, res) => {
  centerModel
    .find()
    .then((result) => {
      if (result.length == 0) {
        res.status(403).send({ msg: "No centers found." });
      } else {
        res
          .status(200)
          .send({ msg: `got ${result.length} centers`, centers: result });
      }
    })
    .catch((err) => {
      res.status(400).send({ msg: "Something went wrong." });
    });
};

exports.getOneCenter = (req, res) => {
  centerModel
    .findById(req.params.centerId)
    .then((result) => {
      if (!result) {
        res.status(403).send({ msg: "Center not found." });
      } else {
        res.status(200).send({ center: result });
      }
    })
    .catch((err) => {
      res.status(400).send({ msg: "Something went wrong." });
    });
};

exports.addSlot = (req, res) => {
  const date = new Date();
  centerModel
    .findById(req.body.centerId).snapshot()
    .then((result) => {
      if (result.slots[req.body.date]) {
        if (result.slots[req.body.date].length < 10) {
            
          if (result.slots[req.body.date].includes(req.user.email)) {
            
            return res
              .status(400)
              .send({ msg: "user has already register for this slot" });
          } else {
           
            result.slots[req.body.date]= [...result.slots[req.body.date],req.user.email];
            
            centerModel.findByIdAndUpdate(req.body.centerId,{slots:result.slots},function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated User : ", docs);
                }})
            return res.status(200).send({ msg: "Slot added" });
    
          }
        } else {
          res.status(400).send({ msg: "Slot not available" });
        }
      } else {
        result.slots = {
          ...result.slots,
          [`${req.body.date}`]: [
            req.user.email,
          ],
        };
        result.save()
        return res.status(200).send({ msg: "Slot added." });
      }
    })
    .catch((err) => {
      res.status(400).send({ msg: "Something went wrong." });
    });
};
