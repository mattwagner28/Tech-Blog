const router = require('express').Router();
const Blog = require('../models/Blog');

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
    

// // route to get one dish
// router.get('/dish/:id', async (req, res) => {
//   try{ 
//       const dishData = await Dish.findByPk(req.params.id);
//       if(!dishData) {
//           res.status(404).json({message: 'No dish with this id!'});
//           return;
//       }
//       const dish = dishData.get({ plain: true });
//       res.render('dish', dish);
//     } catch (err) {
//         res.status(500).json(err);
//     };     
// });

module.exports = router;
