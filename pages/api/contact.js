import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.dxqx36i.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      return res.status(500).json({ message: 'Cound not connect to database' });
    }

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      console.log(result);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      return res.status(500).json({ message: 'Storing message failed' });
    }

    client.close();
    res.status(201).json({ message: 'Success', newMessage });
  }
}