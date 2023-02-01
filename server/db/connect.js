import { MongoClient } from "mongodb";

let _db;
const connectToDB = function (callback) {
  MongoClient.connect(process.env.MONGO_URI, (error, client) => {
    if (error) {
      console.log(error);
    }

    if (client) {
      _db = client.db("WriteIMG");
      console.log("Connect to MongoDB Sucessfully.");
    }

    return callback(error);
  });
};

const getDB = function () {
  return _db;
};

export { connectToDB, getDB };
