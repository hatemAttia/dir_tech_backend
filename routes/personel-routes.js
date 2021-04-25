const express = require("express");
const router = express.Router();
const { DataType, Sequelize } = require("sequelize");
const { passwordHash, passwordVerify, } = require('nodejs-password');
var multer = require('multer')
const db = require("../models.bak");

// add teacher account
router.post('/new', (req, res) => {
    const salt = req.body.email;
    const password = req.body.password;
    passwordHash(password, salt).then(hashPAssword => {
        db.Personel.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            cin: req.body.cin,
            password: hashPAssword,
            matricule: req.body.matricule,
            phonenumber: req.body.phonenumber,
            avatar: "shared/images",
            poste: req.body.poste,
        }).then(allPersonel => res.send(allPersonel));
    }).catch(error => res.status(500).json(error));
});

//afficher all teacher
router.get('/all', (req, res) => {
    db.Personel.findAll({
        include: db.offre
    }).then(allPersonel => res.send(allPersonel));
})
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

//afficher all teacher
router.get('/:id', (req, res) => {
    db.Personel.findAll({
        where: { id: req.params.id },
        include: [db.offre]
    }).then(allPersonel => res.send(allPersonel));
})


// update teacher
router.put('/update/:id', (req, res) => {
    db.Personel.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(instance) {
        if (instance == null) {
            res.send("Stuff not found")
        }
        instance.firstname = req.body.firstname;
        instance.lastname = req.body.lastname;
        instance.cin = req.body.cin;
        instance.poste = req.body.poste;
        instance.matricule = req.body.matricule;
        instance.phonenumber = req.body.phonenumber;
        instance.save().then(function() {
            res.status(200).json(instance)
        }).catch(error => console.log(error));;
    }).catch(error => console.log(error));;
});
module.exports = router;