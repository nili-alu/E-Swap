// models/Category.js
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Category has many items
      Category.hasMany(models.Item, {
        foreignKey: "categoryId",
        as: "items",
      });
    }
  }

  Category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );

  return Category;
};
