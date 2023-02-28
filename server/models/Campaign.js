const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  brand:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
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