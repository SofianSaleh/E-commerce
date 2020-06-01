const mongoose = require("mongoose");

async function connection() {
  try {
    await mongoose.connect(``, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`connected to the database`);
  } catch (e) {
    console.log(`Error Cconnecting to the database`);
    console.log(`${e.message}`);
  }
}

module.exports = {
  connection,
};
