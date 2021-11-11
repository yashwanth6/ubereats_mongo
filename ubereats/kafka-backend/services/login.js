var User =require('../models/User');
var Owner =require('../models/R_Owner');
const connectDB = require('../config/db');

connectDB();

async function handle_request(msg, callback){
    var response = {};
    const email = msg.email;
    const password= msg.password;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        response.status = 400;
        response.message = 'Invalid Credentials';
        return callback(null, response);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        response.status = 400;
        response.message = 'Invalid Credentials';
        return callback(null, response);
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
          response.status = 200;
                        response.message = {
                            token
                        };
                        return callback(null, response);
        }
      );
    } catch (err) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}
    

exports.handle_request = handle_request;