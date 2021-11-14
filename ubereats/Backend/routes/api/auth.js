
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {auth} = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
var kafka = require('../../kafka/client');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');


// @route    GET api/auth
// @desc     Get user by token
// @access   Private


auth();

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public

router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    auth();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
/*
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

*/



  kafka.make_request('login',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.json(results);
  });
});





module.exports = router;
