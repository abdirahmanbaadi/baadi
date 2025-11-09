const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('university');
    const studen = db.collection('studen');
       const insertResult = await studen.insertMany([
      { name: "Maryan", age: 21, department: "Accounting", year: 2 },
      { name: "Samar", age: 20, department: "BCS", year: 2 },
      { name: "Sihaam", age: 26, department: "Engineering", year: 4 }
    ]);

    const allstudents = await studen.find().toArray();
    console.log("All students:", allstudents);

    const updateResult = await studen.updateOne(
      { name: "Sihaam" },       
      { $set: { year: 5 } }       
    );

    console.log('Matched Documents:', updateResult.matchedCount);
    console.log('Modified Documents:', updateResult.modifiedCount);

    const deleteMany = await studen.deleteMany({ name: "Samar"});
    console.log("Delete One:", deleteOne.deletedCount);

    const deleteOne = await studen.deleteOne({ name: "jihaan"});
    console.log("Delete One:", deleteOne.deletedCount);

     const updateresult = await studen.updateMany(
      { name: "Sihaam" },       
      { $set: { year: 5 } }       
    );



        
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

run();
