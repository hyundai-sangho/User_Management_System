const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    // mongodb 연결
    const 연결 = await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB 연결됨: ${연결.connection.host}`);
  } catch (에러) {
    console.log(에러);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
