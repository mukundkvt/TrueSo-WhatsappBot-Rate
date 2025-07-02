import mongoose from 'mongoose';
import moment from 'moment-timezone';
import dotenv from 'dotenv';
dotenv.config();

export const updateGoldRate = (req, res) => {
  const key = req.body.key;
  const rateRaw = req.body.rate;

  if (!key || key !== process.env.API_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }

  const rate = parseFloat(rateRaw);
  if (isNaN(rate)) {
    return res.status(400).json({ error: 'Invalid gold rate' });
  }

  const now = moment().tz('Asia/Kolkata');
  const formattedDate = now.format('DD/MM/YYYY');
  const formattedTime = now.format('HH:mm:ss');
  const unixTimestamp = now.unix();

  const goldCollection = mongoose.connection.collection('6865192e33774d71893a9080_golds');
  const goldDocumentId = new mongoose.Types.ObjectId('6865195a33774d71893a90b0');

  console.log('Trying to update gold rate for _id:', goldDocumentId);

  goldCollection.findOneAndUpdate(
    { _id: goldDocumentId },
    {
      $set: {
        rate: rate,
        updated_on: unixTimestamp,
        date: formattedDate,
        time: formattedTime
      }
    },
    { returnDocument: 'after' }
  )
    .then((result) => {
      console.log('MongoDB result:', result);
      if (!result) {
        return res.status(404).json({ error: 'Gold rate record not found' });
      }
      res.status(200).json({ message: 'Gold rate updated', data: result });
    })
    .catch((err) => {
      console.error('Gold update error:', err);
      res.status(500).json({ error: 'Failed to update gold rate' });
    });
};
