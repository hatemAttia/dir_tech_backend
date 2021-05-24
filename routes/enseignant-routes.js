const express = require("express");
const router = express.Router();
const { DataType, Sequelize } = require("sequelize");
const { passwordHash, passwordVerify, } = require('nodejs-password');
var multer = require('multer')

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
            avatar: "uploads/user.png",
            matricule: req.body.matricule,
            level: req.body.level,
            description: req.body.description,
        }).then(Enseignant => {
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
    }).catch(error => res.status(500).json(error));
});

// update teacher
router.put('/update/:id', (req, res) => {

    db.Enseignant.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(instance) {
        if (instance == null) {
            res.send("Teacher not found")
        }
        instance.firstname = req.body.firstname;
        instance.lastname = req.body.lastname;
        instance.cin = req.body.cin;
        instance.level = req.body.level;
        instance.description = req.body.description;
        instance.matricule = req.body.matricule;
        instance.phonenumber = req.body.phonenumber;
        instance.save().then(function() {
            res.status(200).json(instance)
        }).catch(error => console.log(error));;
    }).catch(error => console.log(error));;
});

// update skill teacher
router.post('/addskill/:id', (req, res) => {
    skills = req.body.skill;
    db.Enseignant.findOne({
        where: {
            id: req.params.id
        }
    }).then(Enseignant => {
        if (Enseignant == null) {
            res.send("Teacher not found")
        }

        if (skills.length > 0) {
            skills.forEach(ski => {
                db.Enseignant_skill.create({
                    skillId: ski.id,
                    EnseignantId: Enseignant.id
                }).then(skil => res.send(skil));
            })
        }
        res.status(200).send({ res: "skill added" })
    }).catch(error => console.log(error));;
});


/**
 * delete skill teacher
 */
router.post('/deleteskill/', (req, res) => {
    db.Enseignant_skill.findOne({
        where: {
            EnseignantId: req.body.EnseignantId,
            skillId: req.body.skillId
        }
    }).then(function(instance) {
        console.log(instance)
        if (instance == null) {
            res.send("Skill not found")
        } else {
            instance.destroy().then(function() {
                res.status(200).send({ res: "skill deleted" })
            }).catch(error => console.log(error));
        }
    });
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

//delete teacher
router.delete('/delete/:id', (req, res) => {
    db.Enseignant.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(instance) {
        console.log(instance)
        if (instance == null) {
            res.send("Skill not found")
        } else {
            instance.destroy().then(function() {
                res.status(200).send({ res: "skill deleted" })
            }).catch(error => console.log(error));
        }
    });
});

//afficher all teacher by skill
router.post('/search', (req, res) => {
    db.Enseignant.findAll({
        include: [{
            model: db.skill,
            as: "skills",
            where: {
                name: req.body.skill
            }
        }]

    }).then(allEnseignant => res.send(allEnseignant));
})

//afficher  teacher
router.get('/:id', (req, res) => {
    db.Enseignant.findOne({
        where: { id: req.params.id },
        include: [db.skill]
    }).then(allEnseignant => res.send(allEnseignant));
})

// upload img
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + `${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

router.post('/file/:id', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    } else {
        db.Enseignant.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(instance) {
            if (instance == null) {
                res.send("Teacher not found")
            }
            instance.avatar = "uploads/" + file.filename;
            instance.save().then(function(rowsUpdated) {
                res.json(rowsUpdated)
            }).catch(next);
        });

        // res.send(file);
    }
})



module.exports = router;