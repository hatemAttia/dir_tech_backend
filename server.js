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
    next();
});

var adminRoutes = require("./routes/admin-routes");
app.use('/api/admin', adminRoutes);

var personelRoutes = require("./routes/personel-routes");
app.use('/api/personel', personelRoutes);

var offreRoutes = require("./routes/offre-routes");
app.use('/api/offre', offreRoutes);


var enseignantRoutes = require("./routes/enseignant-routes");
app.use('/api/enseignant', enseignantRoutes);


var authRoutes = require("./controller/login");
app.use('/api/auth/', authRoutes);


app.get('/', function(req, res) {
    res.send('hello world');
});
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listing at http://localhost:${PORT}`);
    })
})