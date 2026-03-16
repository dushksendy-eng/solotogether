const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:       { type: String, required: true },
  type:        { type: String, enum: ['eat', 'explore', 'tour', 'day-trip', 'nightlife', 'other'], default: 'other' },
  location:    { type: String, required: true },
  date:        { type: Date, required: true },
  description: { type: String, required: true },
  maxPeople:   { type: Number, default: 4 },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
  tags:  [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);