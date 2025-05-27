const express = require('express');
const router = express.Router();
const Team = require('../models/Team')


router.get('/', async(req, res) => {
    try {
        const events = await Team.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const newTeam = new Team(req.body);
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});


module.exports = router;