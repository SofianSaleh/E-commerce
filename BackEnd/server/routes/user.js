const express = require(`express`);
const { register } = require("../../controllers/userController");
const router = express.Router();

router.post(`/register`, async (req, res) => {
  try {
    const signUp = await register(req.body);
    res.sendStaus(200).json(signUp);
  } catch (e) {
    res.sendStaus(400).json({
      success: false,
      message: e.message,
    });
  }
});

module.exports = router;
