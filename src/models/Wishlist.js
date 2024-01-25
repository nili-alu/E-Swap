// models/Wishlist.js
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Wishlist extends Model {
    static associate(models) {
      // Wishlist belongs to a user
      Wishlist.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      // Wishlist has many items (as items in the wishlist)
      Wishlist.belongsTo(models.Item, {
        foreignKey: "itemId",
        as: "item",
      });
    }
  }

  Wishlist.init(
    {
      id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },

      itemId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Item",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Wishlist",
    }
  );

  return Wishlist;
};
