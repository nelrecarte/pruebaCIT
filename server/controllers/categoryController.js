const { Category } = require('../models');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const conflict = await Category.findOne({
      where: { name },
    });
    //Revisar si la categoria ya existe
    if (conflict) {
      return res.status(409).json({ message: 'La categoria ya existe' });
    }
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateCategory = async (req, res) => {
  const { id_category } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByPk(id_category);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    category.name = name;
    await category.save();
    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteCategory = async (req, res) => {
  const { id_category } = req.params;
  try {
    const category = await Category.findByPk(id_category);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getCategoryById = async (req, res) => {
  const { id_category } = req.params;
  try {
    const category = await Category.findByPk(id_category);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
};
