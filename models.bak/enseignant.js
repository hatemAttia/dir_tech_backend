const db = require(".");

module.exports = (sequelize, DataTypes) => {
    const Enseignant = sequelize.define('Enseignant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: { type: DataTypes.STRING, allowNull: false },
        lastname: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, primaryKey: true, },
        cin: { type: DataTypes.INTEGER, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        phonenumber: { type: DataTypes.INTEGER, allowNull: false },
        avatar: { type: DataTypes.STRING, allowNull: false },
        matricule: { type: DataTypes.STRING, allowNull: false },
        level: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        //plus
        degreeobtained: { type: DataTypes.STRING, allowNull: true },
        diplomainstituation: { type: DataTypes.STRING, allowNull: true },
        yearsexperience: { type: DataTypes.STRING, allowNull: true },
        url: { type: DataTypes.STRING, allowNull: true },
        certificat: { type: DataTypes.STRING, allowNull: true },
    });
    Enseignant.associate = models => {
        Enseignant.belongsToMany(models.skill, {
            through: 'Enseignant_skill'
        });
    }
    return Enseignant;

};