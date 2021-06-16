const express = require("express");
const router = express.Router();
const db = require("../models.bak");
const { passwordHash, passwordVerify, } = require('nodejs-password');

//auth Admin
router.post('/admin', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    // console.log(req.body);
    db.Admin.findAll({
        where: { email: email }
    }).then(Admin => {
        console.log(Admin)
        if (!Admin) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        const samePassword = passwordVerify(password, Admin[0].password, email).then(valid => {
            //console.log(password + "++++++++++++++++" + Admin[0].password + "++++++++++++++++" + email);
            if (valid) {
                res.status(200).json({
                    id: Admin[0].id,
                    firstname: Admin[0].firstname,
                    lastname: Admin[0].lastname,
                    email: Admin[0].email,
                    cin: Admin[0].cin,
                    phonenumber: Admin[0].phonenumber,
                    avatar: Admin[0].avatar,
                });
            } else {
                res.send("Incorrect Username and/or Password!");
            }
        }).catch(error => res.status(500).json({ error: false }));
    }).catch(error => res.status(500).json({ error: false }));
});

router.post('/stuff', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    // console.log(req.body);
    db.Personel.findAll({
        where: { email: email },
        include: db.offre
    }).then(Personel => {
        if (!Personel) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        passwordVerify(password, Personel[0].password, email).then(valid => {
            //console.log(password + "++++++++++++++++" + Personel[0].password + "++++++++++++++++" + email);
            if (valid) {
                res.status(200).json({
                    id: Personel[0].id,
                    firstname: Personel[0].firstname,
                    lastname: Personel[0].lastname,
                    email: Personel[0].email,
                    cin: Personel[0].cin,
                    phonenumber: Personel[0].phonenumber,
                    avatar: Personel[0].avatar,
                    poste: Personel[0].poste,
                    matricule: Personel[0].matricule,
                    offres: Personel[0].offres
                });
            } else {
                res.send("Incorrect Username and/or Password!");
            }
        }).catch(error => res.status(500).json({ error: false }));
    }).catch(error => res.status(500).json({ error: false }));
});

router.post('/teacher', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    db.Enseignant.findAll({
        include: db.skill,
        where: { email: email }
    }).then(Enseignant => {

        if (!Enseignant) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        const samePassword = passwordVerify(password, Enseignant[0].password, email).then(valid => {
            if (valid) {
                res.status(200).json({
                    id: Enseignant[0].id,
                    firstname: Enseignant[0].firstname,
                    lastname: Enseignant[0].lastname,
                    email: Enseignant[0].email,
                    cin: Enseignant[0].cin,
                    phonenumber: Enseignant[0].phonenumber,
                    avatar: Enseignant[0].avatar,
                    matricule: Enseignant[0].matricule,
                    level: Enseignant[0].level,
                    description: Enseignant[0].description,
                    degreeobtained: Enseignant[0].degreeobtained,
                    diplomainstituation: Enseignant[0].diplomainstituation,
                    yearsexperience: Enseignant[0].yearsexperience,
                    url: Enseignant[0].url,
                    certificat: Enseignant[0].certificat,
                    skills: Enseignant[0].skills
                });
            } else {
                res.send("Incorrect Username and/or Password!");
            }
        }).catch(error => res.status(500).json(error));
    }).catch(error => res.status(500).json({ error: false }));
});




module.exports = router;