import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://gdavidson1982:GreatPilot25@whitman-keypress.qrrig.mongodb.net/?retryWrites=true&w=majority&appName=Whitman-Keypress';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  try {
    await client.connect();
    const database = client.db('Whitman-Keypress');
    const collection = database.collection('logs');
    const logs = await collection.find({}).toArray();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  } finally {
    await client.close();
  }
}
