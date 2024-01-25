// src/controllers/ItemController.js
import { db } from "../models";

const Item = db.Item;

export const createItem = async (req, res) => {
  try {
    // Check if the user is a seller before creating an item
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can create items" });
    }

    const itemData = {
      ...req.body,
      sellerId: req.user.id,
    };

    const item = await Item.create(itemData);

    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Item.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedItem = await Item.findByPk(id);
      return res.status(200).json(updatedItem);
    }
    return res.status(404).json({ message: "Item not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Item.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: "Item not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
