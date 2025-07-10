import mongoose from 'mongoose';
import moment from 'moment-timezone';
import dotenv from 'dotenv';
dotenv.config();

// Helper: Format number in Indian system without forcing .00
const formatIndianNumber = (value) => {
  const parts = value.toString().split('.');
  const integerPart = parseInt(parts[0]).toLocaleString('en-IN');
  return parts.length === 2 ? `${integerPart}.${parts[1]}` : integerPart;
};

// Helper: Get Hindi date like "10 जुलाई, 2025"
const getHindiDate = (momentObj) => {
  const hindiMonths = [
    'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
  ];
  const day = momentObj.date();
  const monthHindi = hindiMonths[momentObj.month()];
  const year = momentObj.year();
  return `${day} ${monthHindi}, ${year}`;
};

// 🔶 18Kt Gold Rate Update
export const updateGold18KtRate = (req, res) => {
  const key = req.body.key;
  const rateRaw = req.body.rate;

  if (!key || key !== process.env.API_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }

  const rateNum = parseFloat(rateRaw.toString().replace(/,/g, ''));
  if (isNaN(rateNum)) {
    return res.status(400).json({ error: 'Invalid gold rate' });
  }

  const rate = formatIndianNumber(rateNum); // store as string with commas

  const now = moment().tz('Asia/Kolkata');
  const formattedDate = now.format('DD/MM/YYYY');
  const formattedTime = now.format('hh:mm:ss A');
  const unixTimestamp = now.unix();
  const date_hindi = getHindiDate(now);

  const goldCollection = mongoose.connection.collection('6866273833774d71893abf0e_gold18kts');
  const goldDocumentId = new mongoose.Types.ObjectId('6866274f33774d71893abf36');

  goldCollection.findOneAndUpdate(
    { _id: goldDocumentId },
    {
      $set: {
        rate, // formatted string
        updated_on: unixTimestamp,
        date: formattedDate,
        time: formattedTime,
        date_hindi
      }
    },
    { returnDocument: 'after' }
  )
    .then((result) => {
      const updatedDoc = result.value || result;
      if (!updatedDoc) {
        return res.status(404).json({ error: 'Gold rate record not found' });
      }
      res.status(200).json({ message: '18Kt Gold rate updated', data: updatedDoc });
    })
    .catch((err) => {
      console.error('18Kt Gold update error:', err);
      res.status(500).json({ error: 'Failed to update 18Kt gold rate' });
    });
};

// 🔶 22Kt Gold Rate Update
export const updateGold22KtRate = (req, res) => {
  const key = req.body.key;
  const rateRaw = req.body.rate;

  if (!key || key !== process.env.API_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }

  const rateNum = parseFloat(rateRaw.toString().replace(/,/g, ''));
  if (isNaN(rateNum)) {
    return res.status(400).json({ error: 'Invalid gold rate' });
  }

  const rate = formatIndianNumber(rateNum); // store as string with commas

  const now = moment().tz('Asia/Kolkata');
  const formattedDate = now.format('DD/MM/YYYY');
  const formattedTime = now.format('hh:mm:ss A');
  const unixTimestamp = now.unix();
  const date_hindi = getHindiDate(now);

  const goldCollection = mongoose.connection.collection('6866270033774d71893abec5_gold22kts');
  const goldDocumentId = new mongoose.Types.ObjectId('686629bb33774d71893ac0f8');

  goldCollection.findOneAndUpdate(
    { _id: goldDocumentId },
    {
      $set: {
        rate, // formatted string
        updated_on: unixTimestamp,
        date: formattedDate,
        time: formattedTime,
        date_hindi
      }
    },
    { returnDocument: 'after' }
  )
    .then((result) => {
      const updatedDoc = result.value || result;
      if (!updatedDoc) {
        return res.status(404).json({ error: 'Gold rate record not found' });
      }
      res.status(200).json({ message: '22Kt Gold rate updated', data: updatedDoc });
    })
    .catch((err) => {
      console.error('22Kt Gold update error:', err);
      res.status(500).json({ error: 'Failed to update 22Kt gold rate' });
    });
};
