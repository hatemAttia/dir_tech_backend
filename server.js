const express = require("express");
const app = express();
const db = require("./models.bak");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Cors headers middleWare
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    next();
});

var adminRoutes = require("./routes/admin-routes");
app.use('/api/admin', adminRoutes);

var personelRoutes = require("./routes/personel-routes");
app.use('/api/stuff', personelRoutes);

var offreRoutes = require("./routes/offre-routes");
app.use('/api/offre', offreRoutes);

var skillRoutes = require("./routes/skill-routes");
app.use('/api/skill', skillRoutes);

var enseignantRoutes = require("./routes/enseignant-routes");
app.use('/api/teacher', enseignantRoutes);



var authRoutes = require("./controller/login");
app.use('/api/auth/', authRoutes);

app.use('/uploads', express.static('uploads'));


app.get('/', function(req, res) {
    res.send('hello world');
});
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listing at http://localhost:${PORT}`);
    })
})