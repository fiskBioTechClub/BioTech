const express = require('express');
const router = express.Router();
const Project = require('../models/Project');


router.get('/', async(req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});


module.exports = router;