import mongoose from 'mongoose';

const metalRateSchema = new mongoose.Schema({
  goldRate: { type: Number, required: true },
  goldLastUpdatedDate: { type: String, required: true },  // YYYY-MM-DD
  goldLastUpdatedTime: { type: String, required: true },  // HH:mm:ss

  silverRate: { type: Number, required: true },
  silverLastUpdatedDate: { type: String, required: true }, // YYYY-MM-DD
  silverLastUpdatedTime: { type: String, required: true }, // HH:mm:ss
});

export const MetalRate = mongoose.model('MetalRate', metalRateSchema);
