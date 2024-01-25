// models/Item.js
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      // Item belongs to a seller (User)
      Item.belongsTo(models.User, {
        foreignKey: "sellerId",
        as: "seller",
      });

      // Item belongs to a category
      Item.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });

      // Item has many carts (as items in the cart)
      Item.belongsToMany(models.Cart, {
        through: "CartItem",
        foreignKey: "itemId",
        as: "carts",
      });

      // Item has many wishlists (as items in the wishlist)
      Item.hasMany(models.Wishlist, {
        foreignKey: "itemId",
        as: "wishlists",
      });
    }
  }

  Item.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      price: DataTypes.FLOAT,
      quantity: DataTypes.INTEGER,
      status: DataTypes.STRING,
      sellerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );

  return Item;
};
