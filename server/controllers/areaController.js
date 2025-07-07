const { Area, Category } = require('../models');

// Get all areas
const getAreas = async (req, res) => {
  try {
    const areas = await Area.findAll({
      include: [{ model: Category, attributes: ['id_category', 'name'] }],
    });
    res.json(areas);
  } catch (error) {
    console.error('Error fetching areas:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new area
const createArea = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    const conflict = await Area.findOne({
      where: { name },
    });
    // Check if the area already exists
    if (conflict) {
      return res.status(409).json({ message: 'Area already exists' });
    }
    // Validate that the fields are not empty
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: 'Name and description are required.' });
    }

    // Find the category by name
    const foundCategory = await Category.findOne({ where: { name: category } });
    if (!foundCategory) {
      return res
        .status(404)
        .json({ message: `Category '${category}' not found.` });
    }

    const newArea = await Area.create({ name, description, id_category: foundCategory.id_category, });
    res.status(201).json(newArea);
  } catch (error) {
    console.error('Error creating area:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an area
const updateArea = async (req, res) => {
  const { id_area } = req.params;
  const { name, description } = req.body;
  try {
    const area = await Area.findByPk(id_area);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    area.name = name;
    area.description = description;
    await area.save();
    res.json(area);
  } catch (error) {
    console.error('Error updating area:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteArea = async (req, res) => {
  const { id_area } = req.params;
  try {
    const area = await Area.findByPk(id_area);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    await area.destroy();
    res.status(204).json({ message: 'Area deleted successfully' });
  } catch (error) {
    console.error('Error deleting area:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAreaById = async (req, res) => {
  const { id_area } = req.params;
  try {
    const area = await Area.findByPk(id_area, {
      include: [{ model: Category, attributes: ['id_category', 'name'] }],
    });
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    res.json(area);
  } catch (error) {
    console.error('Error fetching area by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAreas,
  createArea,
  updateArea,
  deleteArea,
  getAreaById,
};
