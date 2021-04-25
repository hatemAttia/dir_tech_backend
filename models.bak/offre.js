module.exports = (sequelize, DataTypes) => {
    const offre = sequelize.define('offre', {
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        deadline: { type: DataTypes.DATE, allowNull: false },
        avatar: { type: DataTypes.STRING, allowNull: false },
        poste: { type: DataTypes.STRING, allowNull: false },
    });

    offre.associate = models => {
        offre.belongsTo(models.Personel, {
            foreignKey: {
                allowNull: false
            }
        });

    }
    return offre;
}