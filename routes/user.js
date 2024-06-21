const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middlewares/auth')

router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: 'Server error.' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if (!user) return res.status(404).json({ message: 'User not found.' })
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: 'Server error.' })
    }
})

module.exports = router;
