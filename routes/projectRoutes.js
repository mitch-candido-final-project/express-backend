const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const uploadCloud = require("../config/cloudinary.js");

//create new project
router.post("/new-project", uploadCloud.single("image"), (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.url;
  }
  Project.create({
    name: req.body.name,
    description: req.body.description,
    owner: req.user._id,
    startDate: req.body.startDate,
    dueDate: req.body.dueDate,
    timeSpent: 0,
    complete: false,
    isPublic: req.body.isPublic,
    image: req.body.image
  })
    .then(singleProject => {
      res.json(singleProject);
    })
    .catch(err => {
      res.json(err);
    });
});

// //get details of one project
// router.get("/details/:id", (req, res, next) => {
//   Project.findByOne(req.params.id)
//     .then(singleProject => {
//       res.json(singleProject);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

//get all of the projects
router.get("/all-projects", (req, res, next) => {
  Project.find({ owner: req.user._id })
    .then(allProjects => {
      res.json(allProjects);
    })
    .catch(err => {
      res.json(err);
    });
});

//update project
router.post("/update/:id", (req, res, next) => {
  Project.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    dueDate: req.body.dueDate,
    timeSpent: req.body.timeSpent,
    complete: req.body.complete,
    isPublic: req.body.isPublic,
    images: req.body.images
  })
    .then(singleProject => {
      res.json(singleProject);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/:id", (req, res, next) => {
  Project.findById(req.params.id)
    .then(theProject => {
      Project.findByIdAndRemove(theProject._id)
        .then(singleProject => {
          res.json(singleProject);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
