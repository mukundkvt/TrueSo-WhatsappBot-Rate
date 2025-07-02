
export const addMetalRate = (req, res) => {

    const receivedKey = req.body.key;
  if (!receivedKey || receivedKey !== process.env.API_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }

  const goldRateRaw = req.body.goldRate;
  const silverRateRaw = req.body.silverRate;

  const nowIST = moment().tz('Asia/Kolkata');
  const date = nowIST.format('DD/MM/YYYY');  // changed format here
  const time = nowIST.format('HH:mm:ss');

  // Build update object dynamically
  const update = {};

  if (goldRateRaw !== undefined) {
    const goldRate = parseFloat(goldRateRaw);
    if (isNaN(goldRate)) {
      return res.status(400).json({ error: 'Invalid goldRate' });
    }
    update.goldRate = goldRate;
    update.goldLastUpdatedDate = date;
    update.goldLastUpdatedTime = time;
  }

  if (silverRateRaw !== undefined) {
    const silverRate = parseFloat(silverRateRaw);
    if (isNaN(silverRate)) {
      return res.status(400).json({ error: 'Invalid silverRate' });
    }
    update.silverRate = silverRate;
    update.silverLastUpdatedDate = date;
    update.silverLastUpdatedTime = time;
  }

  if (Object.keys(update).length === 0) {
    return res.status(400).json({ error: 'No valid rate provided to update' });
  }

  MetalRate.findOneAndUpdate({}, { $set: update }, { new: true, upsert: true })
    .then((doc) => {
      res.status(200).json({ message: 'Rates updated successfully', data: doc });
    })
    .catch((err) => {
      console.error('Error updating metal rates:', err);
      res.status(500).json({ error: 'Failed to update rates' });
    });
};

export const getMetalRate = (req, res) => {
  MetalRate.findOne({})
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ error: 'No rate data found' });
      }
      res.status(200).json({ message: 'Latest rates fetched successfully', data: doc });
    })
    .catch((err) => {
      console.error('Error fetching metal rates:', err);
      res.status(500).json({ error: 'Failed to fetch rates' });
    });
};