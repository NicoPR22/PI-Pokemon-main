const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    ID : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fuerza: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defensa: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    velocidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    altura: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: true,
  } 
  },
  {
    timestamps: false
  });
};
