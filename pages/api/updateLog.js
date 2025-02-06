import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;  // Use environment variable instead of hardcoded URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    await client.connect();
    const database = client.db('Whitman-Keypress');
    const collection = database.collection('logs');
    const logEntry = req.body;
    await collection.insertOne(logEntry);
    res.status(200).json({ message: 'Log entry added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add log entry' });
  } finally {
    await client.close();
  }
}
