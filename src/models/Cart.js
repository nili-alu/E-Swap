// models/Cart.js
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // Cart belongs to a user
      Cart.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      // Cart has many items (as items in the cart)
      Cart.belongsTo(models.Item, {
        foreignKey: "itemId",
        as: "item",
      });
    }
  }

  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      itemId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Item",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );

  return Cart;
};
