const db = require(".");

module.exports = (sequelize, DataTypes) => {
    const Enseignant = sequelize.define('Enseignant', {
        firstname: { type: DataTypes.STRING, allowNull: false },
        lastname: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        cin: { type: DataTypes.INTEGER, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        phonenumber: { type: DataTypes.INTEGER, allowNull: false },
        avatar: { type: DataTypes.STRING, allowNull: false },
        matricule: { type: DataTypes.STRING, allowNull: false },
        level: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
    });
    Enseignant.associate = models => {
        Enseignant.belongsToMany(models.skill, {
            through: 'Enseignant_skill'
        });
    }
    return Enseignant;

};