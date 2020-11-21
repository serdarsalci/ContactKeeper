const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult, check } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config')




// @route POST api / users
// @desc Register a user
// @access Public

router.post('/',
  [
    check('name', 'name is required')
      .not().isEmpty(),
    check('email', 'Please include valid email')
      .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
      .isLength({ min: 2 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
      console.log('error empty degil')
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      console.log(user);

      if (user) {

        return res.status(400).json({ msg: 'User already exists!' });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      try {
        await user.save();
      } catch (error) {
        console.log('user.save de takildi')
      }


      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 36000

      }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });


    } catch (err) {
      console.error(err.message);
      res.status(500).send('server eeerror')
    }
  });

module.exports = router;