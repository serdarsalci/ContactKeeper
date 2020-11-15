const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult, check } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');




// @route GET api/contacts
// @desc Get all users contacts
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }

});


// @route POST api/contacts
// @desc Get all users contacts
// @access Private
router.post('/', [
  auth,
  [
    check('name', 'Name is required').not().isEmpty()
  ]
],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log('validation failed');
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');

    }

  });

// @route PUT api/contacts/:id
// @desc Update contacts
// @access Private
router.put('/:id', (req, res) => {
  res.send('Update contacts');
});

// @route DELETE api/contacts/:id
// @desc Delete contact
// @access Private
router.delete('/:id', (req, res) => {
  res.send('Delete contacts');
});



module.exports = router;