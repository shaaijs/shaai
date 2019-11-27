const express = require('express')
const router = express.Router();
const blogsController = require('./../controllers/blogs')
const userController = require('./../controllers/user')

router.get('/', (req, res, next) => res.redirect('/login'));

router.get('/blogs/:blogCode', async function (req, res, next) {
  const data = await blogsController.getAll(req.params.blogCode, req.query.limit)
  res.render('blogs', {
    data
  });
});

router.get('/api/blogs/:blogCode', async function (req, res, next) {
  const data = await blogsController.getAll(req.params.blogCode, req.query.limit)
  res.json(data);
});

router.get('/blog/:id?', async function (req, res, next) {
  let id = req.params.id
  const data = await blogsController.get(id) || {}
  res.render('blog', {
    data, id
  });
});

router.delete('/blog/:id', async function (req, res, next) {
  const data = await blogsController.remove(req.params.id)
  res.json({
    success: true,
    blogCode: data.blogCode
  });
});

router.put('/blog/:id', async function (req, res, next) {
  let data = await blogsController.edit(req.body.userToken, req.params.id, req.body.form)
  res.json({
    success: true,
    data
  });
});

router.post('/blog', async function (req, res, next) {
  let data = await blogsController.create(req.body.userToken, req.body.form)
  res.json({
    success: true,
    data
  });
});


// User routers

router.get('/login', async function (req, res, next) {
  res.render('auth', { pageType: 'login' });
});

router.post('/login', async function (req, res, next) {
  let data = await userController.login(req.body)
  res.json({ data });
});

router.get('/signup', async function (req, res, next) {
  res.render('auth', { pageType: 'signup' });
});

router.post('/signup', async function (req, res, next) {
  let data = await userController.signUp(req.body)
  res.json({ data });
});

module.exports = router;
