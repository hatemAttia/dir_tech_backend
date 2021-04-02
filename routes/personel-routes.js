const express = require("express");
const router = express.Router();
const { DataType, Sequelize } = require("sequelize");
const { passwordHash, passwordVerify, } = require('nodejs-password');

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
            phonenumber: req.body.phonenumber,
            avatar: req.body.avatar,
            poste: req.body.poste,
        }).then(allPersonel => res.send(allPersonel));
    }).catch(error => console.log(error));
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

module.exports = router;