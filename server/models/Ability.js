module.exports = (sequelize, DataTypes) => {
  const Ability = sequelize.define("Ability", {
    ability_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    slot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Ability.associate = (models) => {
    Ability.belongsTo(models.Pokemons, {
      foreignKey: "pokemonId",
    });
  };

  return Ability;
};
