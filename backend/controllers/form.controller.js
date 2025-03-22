import Form from '../models/form.model.js';

// Controller for adding a village manually
export const addVillage = async (req, res) => {
  try {
    const { name, dist_name, state_name } = req.body;

    if (!name || !dist_name || !state_name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the exact village entry already exists
    let existingVillage = await Form.findOne({ name, dist_name, state_name });

    if (existingVillage) {
      return res.status(400).json({ error: 'This village entry already exists' });
    }

    // Create new village entry
    const newVillage = new Form({ name, dist_name, state_name });
    await newVillage.save();

    res.json({ message: 'Village added successfully', village: newVillage });
  } catch (error) {
    console.error('Error adding village:', error);
    res.status(500).json({ error: 'Failed to add village', details: error.message });
  }
};
