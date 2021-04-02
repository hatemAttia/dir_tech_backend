const express = require("express");
const router = express.Router();
const { DataType, Sequelize } = require("sequelize");
const { passwordHash, passwordVerify, } = require('nodejs-password');

const db = require("../models.bak");
var skills = [{}];
var id = null;

// add teacher account
router.post('/new', (req, res) => {
    skills = req.body.skill;
    const salt = req.body.email;
    const password = req.body.password;
    passwordHash(password, salt).then(hashPAssword => {
        db.Enseignant.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            cin: req.body.cin,
            password: hashPAssword,
            phonenumber: req.body.phonenumber,
            avatar: req.body.avatar,
            matricule: req.body.matricule,
            level: req.body.level,
            description: req.body.description,
        }).then(Enseignant => {
            // skilltest = db.skill.create({
            //     name: "angular",
            //     level: "bon",
            // })
            if (skills.length > 0) {
                skills.forEach(ski => {
                    db.Enseignant_skill.create({
                        skillId: ski.id,
                        EnseignantId: Enseignant.id
                    }).then(skil => res.send(skil));
                })
            }
            res.send(Enseignant)
        })
    }).catch(error => console.log(error));
});

//afficher all teacher
router.get('/all', (req, res) => {
    db.Enseignant.findAll({
        include: db.skill
    }).then(allEnseignant => res.send(allEnseignant));
})
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

//afficher  teacher
router.get('/:id', (req, res) => {
    db.Enseignant.findAll({
        where: { id: req.params.id },
        include: [db.skill]
    }).then(allEnseignant => res.send(allEnseignant));
})


module.exports = router;