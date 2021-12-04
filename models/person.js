const mongoose = require("mongoose");
const configs = require("../configs");

const { MONGO_PASSWORD, MONGO_DB_NAME, MONGO_URL, MONGO_USER } = configs;

const URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

console.log("Connecting to MongoDB...");
mongoose
  .connect(URL)
  .then(() => console.log("Connection to MongoDB successful."))
  .catch((err) => console.error("Error connecting to MongoDB\n", err));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__V;
    }
});

const Person = new mongoose.model("Person", personSchema);

module.exports = Person;
