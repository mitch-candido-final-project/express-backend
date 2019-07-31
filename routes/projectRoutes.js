const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

//create new project
router.post("/new-project", (req, res, next) => {
  Project.create({
    name: req.body.name,
    owner: req.user._id,
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

//get details of one project
router.get("/details/:id", (req, res, next) => {
  Project.findById(req.params.id)
    .then(singleProject => {
      res.json(singleProject);
    })
    .catch(err => {
      res.json(err);
    });
});

//update project
router.post("/update/:id", (req, res, next) => {
  Project.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
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
