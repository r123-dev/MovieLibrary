const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

/* Note Session data is not saved in the cookie itself, just the session ID.
Session data is stored server-side. */
const session = require('express-session');
const cookieParser=require('cookie-parser');
const validator = require('./middleware/validator');
const authenticator = require('./middleware/authenticator');

const movies = require('./components/moviesController');
const user = require('./components/userController');
const posts = require('./components/posts');
const schemas =require('./schemas');
router.use(cookieParser());
 
router.use(session({
    secret: "vivek",
    saveUninitialized: true,
    resave: true
}));
// router.use(
//   session({
//    genid: () => uuidv4(), // use UUIDs for session IDs
//   //  genid: function(req) {
//   //   return require('crypto').randomBytes(48).toString('hex'); // use UUIDs for session IDs
//   //   }, 
//    secret: "vvvv",
//    cookie: { maxAge: 60 * 60 * 1000 },
//     resave: false,
//     saveUninitialized: false,
//   // genid: function(req) {
//   //   return require('crypto').randomBytes(48).toString('hex'); // use UUIDs for session IDs
//   //   },
//   //   secret: 'JollynakAjollynakAjollynakApamPam',
//   //   resave: false,
//   //   saveUninitialized: false,
//     //name: **THIS SHOULD BE DYNAMIC BASED ON URL???**
//   })
// );
// let sessionData;
// router.get('/get_session', authenticator, async (req, res) => {
//   sessionData = req.session;
//   const userData = await user.getUserById(sessionData.user.id);
//   return res.status(200).json(userData);
// });

router.get('/movies', movies.getMovies);
router.get('/movies/:id', movies.getMovieById);
router.get('/movie/:name', movies.getMovieIfNotExistsAddsDB);
router.post('/movies/watchlist', authenticator, movies.getMoviesWithArray);

// Endpoint responsible for creating a new user in the system
router.post('/register', validator(schemas.user.register), user.register);

// Endpoint responsible for authenticating a user based on its password and username
router.post(
  '/authenticate',
  validator(schemas.user.login),
  async (req, res) => {
    // sessionData = req.session;
    // sessionData.user = {};
    // const { username, password } = req.body;
    // const result = await user.loginUser(username, password);
    // if (result.error) {
    //   return res
    //     .status(result.error.status)
    //     .json({ error: result.error.message });
    // }
    // sessionData.user = result;
    // return res.json(result);
    // try {
    //   const sessionData = req.session;
      
    //   if (!sessionData) {
    //     return res.status(500).json({ error: 'Session not initialized' });
    //   }

    //   const { username, password } = req.body;
    //   const result = await user.loginUser(username, password);

    //   if (result.error) {
    //     return res
    //       .status(result.error.status)
    //       .json({ error: result.error.message });
    //   }

    //   sessionData.user = result;
    //   return res.json(result);
    // } catch (err) {
    //   return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    // }
    try {
      if (!req.session) {
        return res.status(500).json({ error: 'Session not initialized' });
      }

      const { username, password } = req.body;
      const result = await user.loginUser(username, password);

      if (result.error) {
        return res
          .status(result.error.status)
          .json({ error: result.error.message });
      }

      // Ensure session is saved properly
      req.session.regenerate((err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to regenerate session' });
        }

        req.session.user = result;

        req.session.save((err) => {
          if (err) {
            console.log("failed to sav sessio")
            return res.status(500).json({ error: 'Failed to save session' });
          }

          return res.json(result);
        });
      });
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  },
);

// Responsible for fetching a user's session


// Responsible for destroying a session
router.get('/destroysession', authenticator, (req, res) => {
  sessionData = req.session;
  sessionData.destroy((err) => {
    if (err) {
      return res.json({ message: 'Error destroying session' });
    }
    return res.json({ message: 'Session destroyed successfully' });
  });
});

router.patch(
  '/user',
  validator(schemas.user.update),
  authenticator,
  user.update,
);

router.patch(
  '/user/removeFromWatchlist/:id',
  authenticator,
  user.removeFromWatchlistArray,
);

// Responsible for creating a new post
router.post(
  '/post',
  validator(schemas.post.createPost),
  authenticator,
  posts.createPost,
);

// Responsible for fetching all the posts by title
router.get('/post/:title', posts.getCommentsByTitle);

// Responsible for updating a post
router.patch(
  '/post/:id',
  validator(schemas.post.update),
  authenticator,
  posts.updateCommentById,
);

// Responsible for deleting a post
router.delete('/post/:id', authenticator, posts.deleteCommentById);

module.exports = router;
