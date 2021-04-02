module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
        firstname: { type: DataTypes.STRING, allowNull: false },
        lastname: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        cin: { type: DataTypes.INTEGER, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        phonenumber: { type: DataTypes.INTEGER, allowNull: false },
        avatar: { type: DataTypes.STRING, allowNull: false },

    });
    return Admin;
};