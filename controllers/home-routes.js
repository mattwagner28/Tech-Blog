const router = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');


// route to get all blog posts
router.get('/', async (req, res) => {
  const blogData = await Blog.findAll().catch((err) => { 
      res.json(err);
    });
      const blogPosts = blogData.map((post) => post.get({ plain: true }));
      // console.log("hello", blogPosts);
      res.render('all', { blogPosts });
    });
    
    router.post('/', async (req, res) => {
      console.log('BACKEND', req.body)
      try { 
        const blogData = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: req.body.date,
      });
      // if the dish is successfully created, the new response will be returned as json
      console.log(blogData);
      res.status(200).json(blogData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
    });
    

// Login route
router.get('/login', (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('login');
});

// // CREATE new user
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      console.log(
        '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
