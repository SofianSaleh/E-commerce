const express = require(`express`);
const { register } = require("../../controllers/userController");
const router = express.Router();

router.post(`/register`, async (req, res) => {
  try {
    const signUp = register(req.body);
    res.json(signUp);
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
});

module.exports = router;
