const jwt = require('jsonwebtoken');
const { register, login } = require('../models/user');

// Use JWT_SECRET from .env
const JWT_SECRET = process.env.JWT_SECRET;

// Login and generate JWT
router.post('/login', async (req, res) => {
  const { email, masterPassword } = req.body;
  try {
    const user = await login(email, masterPassword);
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});