module.exports=(sequelize,DataTypes,Model)=>{
class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:
      {
        isAlpha: true
      },
      get() {
        const rawValue = this.getDataValue('firstName');
        return rawValue ? rawValue.toUpperCase() : null;
      }
    },
    lastName: {
      type: DataTypes.STRING,
      defaultValue:'Singh'
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  },
);
return User;
}
