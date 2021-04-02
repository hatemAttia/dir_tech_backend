const express = require("express");
const router = express.Router();
const db = require("../models.bak");
const { passwordHash, passwordVerify, } = require('nodejs-password');
var multer = require('multer')

// add admin account
router.post('/new', (req, res) => {
    const salt = req.body.email;
    const password = req.body.password;
    passwordHash(password, salt).then(hashPAssword => {
            db.Admin.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                cin: req.body.cin,
                password: hashPAssword,
                phonenumber: req.body.phonenumber,
                avatar: req.body.avatar,
            }).then(newAdmin => res.send(newAdmin));
        })
        .catch(error => console.log(error));

});
//get all admins
router.get('/all', (req, res) => {
    db.Admin.findAll().then(allAdmin => res.send(allAdmin));
});

//get admin
router.get('/:id', (req, res) => {
    db.Admin.findAll({
        where: { id: req.params.id }
    }).then(Admin => res.send(Admin));
});

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// update admin
router.put('/update/:id', (req, res) => {

    db.Admin.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(instance) {
        if (instance == null) {
            res.send("admin not found")
        }
        instance.firstname = req.body.firstname;
        instance.lastname = req.body.lastname;
        instance.email = req.body.email;
        instance.cin = req.body.cin;
        instance.phonenumber = req.body.phonenumber;
        instance.avatar = req.body.avatar;

        instance.save().then(function() {
            res.send('admin updated');
        });
    });
});

//delete admin
router.delete('/delete/:id', (req, res) => {
    db.Admin.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(instance) {
        if (instance == null) {
            res.send("admin not found")
        }
        instance.destroy().then(function() {
            res.send('admin removed');
        });
    });
});

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

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

router.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file);
})

module.exports = router;