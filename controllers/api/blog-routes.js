// const router = require('express').Router();
// const Blog = require('../../models/Blog');
// // const { Blog } = require("../models");


// // route to create/add a dish using async/await
// router.post('/', async (req, res) => {
//   console.log('BACKEND', req.body)
//   try { 
//     const blogData = await Blog.create({
//     title: req.body.title,
//     content: req.body.content,
//     author: req.body.author,
//     date: req.body.date,
//   });
//   // if the dish is successfully created, the new response will be returned as json
//   console.log(blogData);
//   res.status(200).json(blogData);
// } catch (err) {
//   console.log(err);
//   res.status(400).json(err);
// }
// });


module.exports = router;
