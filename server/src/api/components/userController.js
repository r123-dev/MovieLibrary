const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = require('../models/users');
const { formatUserResponse } = require('../helpers/utils');

const User = mongoose.model('User', userSchema.schema);

/**
 * Responsible for registering a user to the system
 * @param {Object} req - Request object
 * @param {Object} req.body - Request body's session
 * @param {String} req.body.username - User's username
 * @param {String} req.body.email - User's email
 * @param {String} req.body.firstName - User's firstName
 * @param {String} req.body.lastName - User's username lastName
 * @param {String} req.body.description - User's description
 * @param {Array} req.body.watchlist - Title id
 * @param {Object} res - Response object
 * @returns
 */
async function register(req, res) {
//   try {
        
//     const {email,username,password}=req.body;
//     let userExist= await User.findOne({email:email});
//     if(userExist){
//      return res.status(400).json({msg:"email already"});
//     }
//     const user = new User({
     
//       username,
//          password,
//           email,
//            firstName,
//            lastName,
//            description,
//            watchlist
//  });
//     await user.save();
//     const payload=user.tokenPayload();
//     const token=await jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:eval(process.env.EXPIRES_IN)});
//       res.status(201).cookie('token',token,{
//        expiresIn:eval(process.env.EXPIRES_IN),
//        httpOnly:true,
//        sameSite:"none"
//    }).json({msg:"userCreated",token:token,user:user});


//    } catch (error) {
//      console.log(error);
//        res.status(500).json({mssg:"internal server error",err:JSON.stringify(error)})
//    }
  const { username, email, firstName, lastName, description, watchlist } =
    req.body;

  const SALT_ROUNDS = 10;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = {
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      description,
      watchlist,
    };
    await User.insertMany(user);
    return res.json({ message: `User ${user.username} created!` });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).json({ message: error.writeErrors[0].errmsg });
    }
    return res.status(400).json({ message: error.message });
  }
}

/**
 * Responsible for user login
 * @param {String} username - user's username
 * @param {String} password - user's password
 * @returns
 */
async function loginUser(username, password) {
  let passwordDecrypt = false;
  try {
    const user = await User.find({
      username,
    }).lean();

    if (user.length > 0) {
      passwordDecrypt = await bcrypt.compare(password, user[0].password);
    }
    if (user.length === 0 || !passwordDecrypt) {
      return {
        error: {
          status: 403,
          message: 'Wrong credentials!',
        },
      };
    }
    return formatUserResponse(user[0]);
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

/**
 * Responsible for fetching a user by its id
 * @param {String} id - User's id
 * @returns
 */
async function getUserById(id) {
  try {
    const userData = await User.findById(id);
    return formatUserResponse(userData);
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

/**
 * Responsible for updating the user's info, including add titles to the user's watchlist
 * @param {Object} req - Request object
 * @param {Object} req.session - Request session object
 * @param {Object} req.session.user - Request session's user object
 * @param {String} req.session.user.id - User's id
 * @param {Object} req.body - Request body's session
 * @param {String} req.body.username - User's username
 * @param {String} req.body.email - User's email
 * @param {String} req.body.firstName - User's firstName
 * @param {String} req.body.lastName - User's username lastName
 * @param {String} req.body.description - User's description
 * @param {String} req.body.title - Title id
 * @param {Object} res - Response object
 * @returns
 */
async function update(req, res) {
  const filter = { _id: req.session.user.id };
  const { username, email, firstName, lastName, description, title } = req.body;
   watchlist.toString();
  const updateDoc = {
    $push: { watchlist: title },
    username,
    email,
    firstName,
    lastName,
    description,
  };
  try {
    const verifyIfMovieIsWatchlist = await User.find(
      { watchlist: { $in: title } },
      { _id: 0 },
    );
    if (verifyIfMovieIsWatchlist.length > 0) {
      throw new Error('The title is already on your list');
    }
    const user = await User.updateOne(filter, updateDoc);
    if (user.modifiedCount === 1) {
      return res.json(user.modifiedCount);
    }
    throw new Error('Could not update comment');
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

/**
 * Responsible for removing a movie from the user's watchlist
 * @param {Object} req - Request object
 * @param {Object} req.session - Request session object
 * @param {Object} req.session.user - Request session's user object
 * @param {String} req.session.user.id - User's id
 * @param {Object} req.params - Request body's params
 * @param {String} req.body.id - Movie Id to be removed
 * @param {Object} res - Response object
 * @returns
 */
async function removeFromWatchlistArray(req, res) {
  const filter = { _id: req.session.user.id };

  const updateDoc = {
    $pull: { watchlist: req.params.id },
  };
  try {
    const removeMovie = await User.updateOne(filter, updateDoc);
    if (removeMovie.modifiedCount === 1) {
      return res.json({ modifiedCount: removeMovie.modifiedCount });
    }
    throw new Error('Could not update comment');
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  register,
  loginUser,
  update,
  removeFromWatchlistArray,
  getUserById,
};
