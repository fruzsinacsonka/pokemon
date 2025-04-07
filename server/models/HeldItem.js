module.exports = (sequelize, DataTypes) => {
  const HeldItem = sequelize.define("HeldItem", {
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rarity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    version_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  HeldItem.associate = (models) => {
    HeldItem.belongsTo(models.Pokemons, {
      foreignKey: "pokemonId",
    });
  };

  return HeldItem;
};
