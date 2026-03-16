const mongoose = require('mongoose');

const travelPlanSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: String, required: true },
  country:     { type: String, required: true },
  startDate:   { type: Date, required: true },
  endDate:     { type: Date, required: true },
  interests:   [{ type: String, enum: ['food', 'nature', 'art', 'nightlife', 'adventure', 'culture', 'shopping', 'photography'] }],
  notes:       { type: String, default: '' },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
}, { timestamps: true });

module.exports = mongoose.model('TravelPlan', travelPlanSchema);