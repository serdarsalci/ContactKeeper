const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const db2 = config.get('mongoURI2');


const connectDB = async () => {

  console.log()
  try {
    await mongoose.connect(db, {

      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MongoDB connected mi");
    console.log(db)
  } catch (err) {
    console.log(err.message);
    process.exit(1);

  };
}

module.exports = connectDB;