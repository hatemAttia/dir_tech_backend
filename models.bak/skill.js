const db = require(".");

module.exports = (sequelize, DataTypes) => {
    const skill = sequelize.define('skill', {
        name: { type: DataTypes.STRING, allowNull: false }
    });

    skill.associate = models => {
        skill.belongsToMany(models.Enseignant, {
            as: 'skill',
            through: 'Enseignant_skill',
        });
    }

    return skill;
}