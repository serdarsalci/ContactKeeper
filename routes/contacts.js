const express = require('express');
const router = express.Router();


// @route GET api/contacts
// @desc Get all users contacts
// @access Private
router.get('/', (rep, res) => {
  res.send('Get all contacts');
});


// @route POST api/contacts
// @desc Get all users contacts
// @access Private
router.post('/', (rep, res) => {
  res.send('Add contacts');
});

// @route PUT api/contacts/:id
// @desc Update contacts
// @access Private
router.put('/:id', (rep, res) => {
  res.send('Update contacts');
});

// @route DELETE api/contacts/:id
// @desc Delete contact
// @access Private
router.delete('/:id', (rep, res) => {
  res.send('Delete contacts');
});



module.exports = router;