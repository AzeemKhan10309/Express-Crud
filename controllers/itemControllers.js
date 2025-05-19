

import Item from "../models/Items.js";

// CREATE
export const createItem =  async (req, res) => {
  try {
    const newItem = await Item.insertMany(req.body);
    // const savedItem = await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
export const getAllItems =  async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    //const item = await Item.find();

    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedItem) return res.status(404).json({ error: "Item not found" });
    res.json(updatedItem);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

