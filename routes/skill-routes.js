const express = require("express");
const router = express.Router();
const db = require("../models.bak");

// add skill 
router.post('/new', (req, res) => {
    db.skill.create({
        name: req.body.name,
    }).then(newskill => res.send(newskill));
});

router.get('/all', (req, res) => {
    db.skill.findAll().then(skill => res.status(200).json(skill));
})

/**
 * update skill
 */
router.put('/update/:id', (req, res) => {
    db.skill.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(instance) {
        if (instance == null) {
            res.send("skill not found")
        }
        instance.name = req.body.name;
        instance.save().then(function() {
            res.status(200).json(instance)
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
});

/**
 * delete skill
 */
router.delete('/delete/:id', (req, res) => {
    db.skill.findOne({
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

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
module.exports = router;