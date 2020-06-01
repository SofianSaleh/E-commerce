const User = require(`../database/User`);

let register = async (userInfo) => {
  try {
    const newUser = new User({ ...userInfo });
    await newUser.save();

    return {
      success: true,
      message: `User signed up succesfully`,
    };
  } catch (e) {
    throw e;
  }
};

module.exports = { register };
