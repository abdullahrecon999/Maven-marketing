const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  email: {
    type: String,
  },
  langauge: {
    type: String,
  },
  country: {
    type: String,
  },
  language: {
    type: String,
  },
  description: {
    type: String,
  },
  platform: {
    type: String,
  }
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;