const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  brand:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  langauge: {
    type: Array,
    default: ["Any"]
  },
  country: {
    type: Array,
    default: ["Any"]
  },
  
  description: {
    type: String,
  },
  platform:{
    type: Array,
    default: ["Any"]
  }
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);

campaignSchema.statics.search = function(searchTerm) {
  const stringSearchFields = ['language', "country", "platform", "description", "title"]
  
  const query = {
      $or: [
          ...stringSearchFields.map(field => ({
              [field]: new RegExp('^' + searchTerm, 'i')
          }))
      ]
  };
  return this.find(query);
};

module.exports = Campaign;