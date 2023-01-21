const express = require('express')
//get using express router
const router = express.Router()

// define article controller and export it for this file
const articleController = require('../controllers/article');

// use controller functions acc to the route
router.get('/', articleController.getAllArticles)
router.get('/article/:slug', articleController.getArticleBySlug);
router.get('/author/:author_id', articleController.getArticlesByAuthor)

// export router for use in default application file
module.exports = router;