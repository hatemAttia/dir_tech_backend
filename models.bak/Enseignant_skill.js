module.exports = (sequelize, DataTypes) => {
    const Enseignant_skill = sequelize.define('Enseignant_skill', {
        EnseignantId: { type: DataTypes.INTEGER, allowNull: false },
        skillId: { type: DataTypes.INTEGER, allowNull: false },

    });
    return Enseignant_skill;
}