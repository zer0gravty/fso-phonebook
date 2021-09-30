const mongoose = require('mongoose');
const configs = require('./configs');

if (process.argv.length <= 2 || process.argv.length === 4) {
    console.log('Usage: node mongo.js <password> [<person> <number>]');
    process.exit(1);
};

const mongoUrl = `mongodb+srv://${configs.MONGO_USER}:${process.argv[2]}@${configs.MONGO_URL}/${configs.MONGO_DB}?retryWrites=true`;
mongoose.connect(mongoUrl);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = new mongoose.model('Person', personSchema);

if (process.argv.length >= 5) {
    const name = process.argv.slice(3, process.argv.length-1).join(' ');
    const number = process.argv[process.argv.length - 1];

    const person = new Person({
        name, number
    });

    person.save(person).then(result => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    })
};

if (process.argv.length === 3) {
    Person.find({}).then(people => {
        people.forEach(person => {
            console.log(`${person.name} ${person.number}`);
            mongoose.connection.close();
        });
    });
};
