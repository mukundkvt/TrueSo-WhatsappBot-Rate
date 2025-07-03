import mongoose from 'mongoose';
import moment from 'moment-timezone';
import dotenv from 'dotenv';
dotenv.config();

export const updateGold18KtRate = (req, res) => {
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
  const formattedTime = now.format('hh:mm:ss A'); // 👈 AM/PM format
  const unixTimestamp = now.unix();

  const goldCollection = mongoose.connection.collection('6866273833774d71893abf0e_gold18kts');
  const goldDocumentId = new mongoose.Types.ObjectId('6866274f33774d71893abf36');

  console.log('Trying to update 18Kt gold rate for _id:', goldDocumentId);

  goldCollection.findOneAndUpdate(
    { _id: goldDocumentId },
    {
      $set: {
        rate,
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
      res.status(200).json({ message: '18Kt Gold rate updated', data: result });
    })
    .catch((err) => {
      console.error('18Kt Gold update error:', err);
      res.status(500).json({ error: 'Failed to update 18Kt gold rate' });
    });
};

export const updateGold22KtRate = (req, res) => {
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
  const formattedTime = now.format('hh:mm:ss A'); // 👈 AM/PM format
  const unixTimestamp = now.unix();

  const goldCollection = mongoose.connection.collection('6866270033774d71893abec5_gold22kts');
  const goldDocumentId = new mongoose.Types.ObjectId('686629bb33774d71893ac0f8');

  console.log('Trying to update 22Kt gold rate for _id:', goldDocumentId);

  goldCollection.findOneAndUpdate(
    { _id: goldDocumentId },
    {
      $set: {
        rate,
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
      res.status(200).json({ message: '22Kt Gold rate updated', data: result });
    })
    .catch((err) => {
      console.error('22Kt Gold update error:', err);
      res.status(500).json({ error: 'Failed to update 22Kt gold rate' });
    });
};
