const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const ItemController = require("../controllers/ItemController");
const CartController = require("../controllers/CartController");
const CategoryController = require("../controllers/CategoryController");
const AuthController = require("../controllers/AuthController");
const WishlistController = require("../controllers/WishlistController");
// middleware
import isSeller from "../middleware/isSeller"
import isBuyer from "../middleware/isBuyer"
import isAdmin from "../middleware/isAdmin"

// User routes
router.post("/users", UserController.createUser);
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

// Item routes
router.post("/items", isSeller, ItemController.createItem);
router.get("/items",  ItemController.getAllItems);
router.get("/items/:id",  ItemController.getItemById);
router.put("/items/:id", isSeller, ItemController.updateItem);
router.delete("/items/:id", isSeller, ItemController.deleteItem);

// Cart routes
router.post("/carts",isBuyer, CartController.createCart);
router.get("/carts", isBuyer, CartController.getAllCarts);
router.get("/carts/:id", isBuyer, CartController.getCartById);
router.put("/carts/:id", isBuyer, CartController.updateCart);
router.delete("/carts/:id", isBuyer, CartController.deleteCart);

// Category routes
router.post("/categories",isAdmin, CategoryController.createCategory);
router.get("/categories", isAdmin, CategoryController.getAllCategories);
router.get("/categories/:id", isAdmin, CategoryController.getCategoryById);
router.put("/categories/:id", isAdmin, CategoryController.updateCategory);
router.delete("/categories/:id", isAdmin, CategoryController.deleteCategory);

// Wishlist routes
router.post("/wishlists", isBuyer, WishlistController.createWishlist);
router.get("/wishlists", isBuyer, WishlistController.getAllWishlists);
router.get("/wishlists/:id", isBuyer, WishlistController.getWishlistById);
router.put("/wishlists/:id", isBuyer, WishlistController.updateWishlist);
router.delete("/wishlists/:id", isBuyer, WishlistController.deleteWishlist);
// Auth routes
router.post("/register", AuthController.signUp);
router.post("/login", AuthController.login);

module.exports = router;
