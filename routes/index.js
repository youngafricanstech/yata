var express = require("express");
var router = express.Router();
const Course = require("../models/course");

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express App' });
// });

router.get("/", async (req, res, next) => {
  try {
    const courses = await Course.find().exec();
    console.log(courses);
    res.render("layout", {
      courses: courses,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

// Welcome Page
// router.get("/", forwardAuthenticated, (req, res) => res.render("index"));

// Dashboard
// router.get("/dashboard", ensureAuthenticated, (req, res) =>
//   res.render("dashboard", {
//     user: req.user,
//     layout: false,
//   })
// );

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  try {
    console.log("dkajkdddddddddddddddddddddddd");
    console.log(req.flash("error_msg")); // Log flash messages (if any)
    res.render("dashboard", {
      user: req.user,
      layout: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
