// src/controllers/CartController.js
import { db } from "../models";

const Cart = db.Cart;

export const createCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.create({
      ...req.body,
      userId,
    });
    return res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll();
    return res.status(200).json(carts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByPk(id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Cart.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedCart = await Cart.findByPk(id);
      return res.status(200).json(updatedCart);
    }
    return res.status(404).json({ message: "Cart not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Cart.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: "Cart not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
