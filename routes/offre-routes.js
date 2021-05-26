const express = require("express");
const router = express.Router();
const { DataType, Sequelize } = require("sequelize");
const db = require("../models.bak");

// add  offre
router.post('/new/:id', (req, res) => {
    db.Personel.findOne({
        where: {
            id: req.params.id
        },
        include: [db.offre]
    }).then(Personel => {
        db.offre.create({
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            poste: req.body.poste,
            avatar: "uploads/download.jpeg",
            PersonelId: req.params.id
        }).then(offre => res.send(Personel));
    })
});

//afficher all offre
router.get('/all', (req, res) => {
    db.offre.findAll({
        include: db.Personel
    }).then(allOffre => res.send(allOffre));
})
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

//afficher  offre
router.get('/:id', (req, res) => {
    db.offre.findOne({
        where: { id: req.params.id },
        include: [db.Personel]
    }).then(alloffre => res.send(alloffre));
})

/**
 * 
 */
//afficher  offre
router.get('/useroffre/:id', (req, res) => {
    db.offre.findAll({
        where: { PersonelId: req.params.id },
    }).then(alloffre => res.send(alloffre));
})

/**
 * update offre
 */
router.put('/update/:id', (req, res) => {
    db.offre.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(instance) {
        if (instance == null) {
            res.send("offre not found")
        }
        instance.title = req.body.title;
        instance.description = req.body.description;
        instance.poste = req.body.poste;
        instance.deadline = req.body.deadline;

        instance.save().then(function() {
            res.status(200).json(instance)
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
});

/**
 * delete offre
 */
router.delete('/delete/:id', (req, res) => {
    db.offre.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(instance) {
        console.log(instance)
        if (instance == null) {
            res.send("offre not found")
        } else {
            instance.destroy().then(function() {
                res.status(200).send({ res: "offre deleted" })
            }).catch(error => console.log(error));
        }
    });
});

module.exports = router;