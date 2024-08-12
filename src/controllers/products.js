import db from "../../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM PRODUCTS");
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No Products Found",
      });
    }

    res.status(200).json({ success: true, data: data[0] });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in fetching the data", err });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const data = await db.query(`SELECT * FROM PRODUCTS WHERE id=?`, id);
    console.log(data);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No Products Found",
      });
    }

    res.status(200).json({ success: true, data: data[0] });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in fetching the data", err });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, desc, price, brand, category } = req.body;
    if (!name || !desc || !price || !brand || !category) {
      return res.status(500).json({
        success: false,
        message: "Please provide all the fields",
      });
    }

    const data = await db.query(
      `INSERT INTO PRODUCTS (name, description, price, brand, category, stock) VALUES(?,?,?,?,?,?)`,
      [name, desc, price, brand, category, 0]
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Error in insertion of data",
      });
    }

    res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in creating the product", err });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const { name, desc, price, brand, category, stock } = req.body;
    if (!name || !desc || !price || !brand || !category || !stock) {
      return res.status(500).json({
        success: false,
        message: "Please provide all the fields",
      });
    }

    const data = await db.query(
      `UPDATE PRODUCTS SET name = ?, description = ?, price = ?, brand = ?, category = ?, stock = ? WHERE id = ?`,
      [name, desc, price, brand, category, stock, id]
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Error in updation of data",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in fetching the data", err });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Invalid ID",
      });
    }

    await db.query(`DELETE FROM PRODUCTS WHERE id = ?`, [id]);
    res
      .status(200)
      .json({ success: true, message: `Product ${id} deleted successfully` });
  } catch {
    return res
      .status(500)
      .json({ success: false, message: "Error in fetching the data", err });
  }
};
