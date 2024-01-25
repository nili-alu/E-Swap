// models/User.js
import { Model } from "sequelize";

const PROTECTED_ATTRIBUTES = ["password"];

export default (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      const attributes = { ...this.get() };
      for (const a of PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
      return attributes;
    }

    static associate(models) {
      // User has many items (seller relationship)
      User.hasMany(models.Item, {
        foreignKey: "sellerId",
        as: "sellerItems",
      });

      // User has one cart
      User.hasOne(models.Cart, {
        foreignKey: "userId",
        as: "userCart",
      });

      // User has one wishlist
      User.hasOne(models.Wishlist, {
        foreignKey: "userId",
        as: "userWishlist",
      });
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "seller", "buyer"),
      status: DataTypes.STRING,
      last_login_at: DataTypes.DATE,
      last_ip_address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
