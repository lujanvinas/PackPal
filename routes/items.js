const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const { body, validationResult } = require('express-validator');


const User = require('../models/User');
const Item = require('../models/Item');

// @route   GET api/items
// @desc    Get all users items
// @access  Private
router.get('/', auth, 
async (req, res) => {
    try {
        const items = await Item.find({ user: req.user.id }).sort({ date: -1 });
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/items
// @desc    Add new item
// @access  Private
router.post('/', [auth, [
    body('object', 'Object is required').not().isEmpty()
] ], 
async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { object, quantity } = req.body;
    
    try {
        const newItem = new Item({
            object,
            quantity,
            user: req.user.id
        });

        const item = await newItem.save();

        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/items/:id
// @desc    Update item
// @access  Private
router.put('/:id', (req, res) => {
    res.send('Update item');
});

// @route   DELETE api/items/:id
// @desc    Delete item
// @access  Private
router.delete('/:id', (req, res) => {
    res.send('Delete item');
});


module.exports = router;