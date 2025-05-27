const express = require('express');
const router = express.Router();
const Opportunity = require('../models/Opportunity');


router.get('/', async(req, res) => {
    try {
        const opportunities = await Opportunity.find();
        res.json(opportunities);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const newOpportunity = new Opportunity(req.body);
        await newOpportunity.save();
        res.status(201).json(newOpportunity);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});


module.exports = router;