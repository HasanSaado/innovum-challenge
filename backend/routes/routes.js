const express = require('express');
const router = express.Router();
const User = require('../models/UserModels');
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
      response.json({ status: 'ok'});
    })
    .catch(error => {
      response.json(error);
    });
});

router.post('/login', async (request, response) => {
	const user = await User.findOne({
		email: request.body.email,
	})

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
})

module.exports = router;