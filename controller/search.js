const express = require("express");
const router = express.Router();
const db = require("../models.bak");

//afficher all teacher
router.get('/all', (req, res) => {
    db.Enseignant.findAll({

        include: [{
            model: skill,
            as: "angular"
        }]

    }).then(allEnseignant => res.send(allEnseignant));
})
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});