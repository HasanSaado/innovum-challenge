const express = require('express');
const router = express.Router();
const User = require('../models/UserModels');
const Book = require('../models/BookModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/signup', async (request, response) => {
  const hashed = await bcrypt.hash(request.body.password, 10);
  const signedUpUser = new User({
    name: request.body.name,
    email: request.body.email,
    password: hashed,
  });
  signedUpUser.save()
    .then(data => {
      response.json({ status: 'ok' });
    })
    .catch(error => {
      response.json(error);
    });
});

router.post('/login', async (request, response) => {
  const user = await User.findOne({
    email: request.body.email,
  });

  if (!user) {
    return { status: 'error', error: 'Invalid login' }
  }

  const isPasswordValid = await bcrypt.compare(
    request.body.password,
    user.password
  )

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      'secret123'
    )

    return response.json({ status: 'ok', user: token })
  } else {
    return response.json({ status: 'error', user: false })
  }
});

router.get('/api/book', async (request, response) => {
  Book.find({})
    .then(data => {
      return response.json({data: data});
    })
    .catch(error => {
      return response.json(error);
    })
});

router.post('/book', async (request, response) => {
  const newBook = new Book({
    title: request.body.title,
    author: request.body.author,
    genre: request.body.genre,
    yearPublished: request.body.yearPublished,
  });
  newBook.save()
    .then(data => {
      response.json({ status: 'ok' });
    })
    .catch(error => {
      response.json(error);
    });
});

router.put(`/book/:id`, async (request, response) => {
  const bookId = request.params.id;

  const query = { _id: bookId };

  const updatedBook = await Book.findOne({
    _id: bookId,
  });

  Book.findOneAndUpdate(query, { isReserved: request.body.isReserved })
    .then(data => {
      response.json({ status: 'ok' });
    })
    .catch(error => {
      response.json(error);
    });
});

module.exports = router;