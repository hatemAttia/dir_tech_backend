const express = require("express");
const router = express.Router();
const db = require("../models.bak");

/**
 * add category
 */
router.post('/new', (req, res) => {
    db.category.create({
        name: req.body.name,
    }).then(newcategory => res.send(newcategory));
});

/**
 * get all category 
 */
router.get('/all', (req, res) => {
    db.category.findAll().then(category => res.status(200).json(category));
})

/**
 * delete category
 */
router.delete('/delete/:id', (req, res) => {
    db.category.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(instance) {
        console.log(instance)
        if (instance == null) {
            res.send("category not found")
        } else {
            instance.destroy().then(function() {
                res.status(200).send({ res: "category deleted" })
            }).catch(error => console.log(error));
        }
    });
});
module.exports = router;