const express = require("express");
const router = express.Router();
const { DataType, Sequelize } = require("sequelize");
const db = require("../models.bak");

// add  offre
router.post('/new/:id', (req, res) => {
    db.offre.create({
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        poste: req.body.poste,
        avatar: "uploads/user.png",
        PersonelId: req.params.id
    }).then(offre => res.send(offre));
});

//afficher all teacher
router.get('/all', (req, res) => {
    db.offre.findAll({
        include: db.Personel
    }).then(allOffre => res.send(allOffre));
})
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

//afficher all teacher
router.get('/:id', (req, res) => {
    db.offre.findAll({
        where: { id: req.params.id },
        include: [db.Personel]
    }).then(alloffre => res.send(alloffre));
})

module.exports = router;