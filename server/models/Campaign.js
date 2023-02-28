const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  brand:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  langauge: Array,
  country: Array,
  
  description: {
    type: String,
  },
  platform: Array
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