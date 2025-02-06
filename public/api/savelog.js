import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;  // Ensure this pulls the MongoDB URI from the environment variable
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await client.connect();
      const database = client.db('Whitman-Keypress');
      const collection = database.collection('logs');
      const result = await collection.insertOne(req.body);  // Inserting data into MongoDB
      res.status(201).json(result);  // Sending response back with result
    } catch (error) {
      res.status(500).json({ error: 'Failed to save log' });  // Error handling
    } finally {
      await client.close();  // Ensure connection is closed
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });  // Handle unsupported methods
  }
}
