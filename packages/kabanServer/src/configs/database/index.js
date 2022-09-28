// Using Node.js `require()`
const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(
      // eslint-disable-next-line no-undef
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fxllx.mongodb.net/${process.env.DB_DATABASE_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    console.log('Connect Successfully!');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };
