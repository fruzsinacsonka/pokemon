module.exports = (sequelize, DataTypes) => {
  const Pokemons = sequelize.define("Pokemons", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    base_experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    abilities: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    cries: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    forms: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    game_indices: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    held_items: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    UserId: {
      type: DataTypes.INTEGER,

      references: {
        model: "Users",
        key: "id",
      },
    },
  });

  Pokemons.associate = (models) => {
    Pokemons.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "user",
    });
    Pokemons.hasMany(models.Ability, {
      onDelete: "cascade",
      foreignKey: "abilityId",
    });
    Pokemons.hasMany(models.HeldItem, {
      onDelete: "cascade",
      foreignKey: "heldItemId",
    });
  };

  return Pokemons;
};
