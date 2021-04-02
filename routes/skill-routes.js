const express = require("express");
const router = express.Router();
const db = require("../models.bak");

// add admin account
router.post('/new', (req, res) => {
    db.skill.create({
        name: req.body.name,
        level: req.body.level,
    }).then(newskill => res.send(newskill));
});

router.get('/all', (req, res) => {
    db.skill.findAll({
        include: db.skill
    }).then(skill => res.send(skill));
})
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
module.exports = router;