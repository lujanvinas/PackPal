const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', (req, res) => {
    res.send('Get logged in user');
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', [
    // sign in with email
    body('email', 'Please include a valid email').isEmail(),
    // password must be entered
    body('password', 'Password is required').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // check if user exists
        let user = await User.findOne({ email });
        // if there is NOT a user..
        if(!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' })
        }

        // if there IS a user...compare entered and stored passwords 
        const isMatch = await bcrypt.compare(password, user.password);
        // if passwords dont match..
        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' })
        };

        // if user exists and passwords match.. get the user ID
        const payload = {
            user: {
                if: user.id
            }
        };
        //... sign in
        jwt.sign(payload, config.get('jwtSecret'), { 
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
        
    }
});


module.exports = router;