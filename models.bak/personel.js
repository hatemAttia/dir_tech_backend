module.exports = (sequelize, DataTypes) => {
    const Personel = sequelize.define('Personel', {
        firstname: { type: DataTypes.STRING, allowNull: false },
        lastname: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        cin: { type: DataTypes.INTEGER, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        phonenumber: { type: DataTypes.INTEGER, allowNull: false },
        matricule: { type: DataTypes.STRING, allowNull: false },
        avatar: { type: DataTypes.STRING, allowNull: false },
        poste: { type: DataTypes.STRING, allowNull: false },

    });
    Personel.associate = models => {
        Personel.hasMany(models.offre, {
            onDelete: "cascade"
        });
    }
    return Personel;
};