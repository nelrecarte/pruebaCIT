const Area = require('../models/Area');

// Get all areas
const getAreas = async (req, res) => {
    try {
        const areas = await Area.findAll();
        res.json(areas);
    } catch (error) {
        console.error('Error fetching areas:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Create a new area
const createArea = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newArea = await Area.create({ name, description });
        res.status(201).json(newArea);
    } catch (error) {
        console.error('Error creating area:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

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
}

module.exports = {
    getAreas,
    createArea,
    updateArea,
};
