const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
  },
  status: {
    type: String,
    default: "draft"
  },
  bannerImg: {
    type: String,
  },
  tags:{
    type: Array,
  },
  questions: {
    type: Array,
  },
  audience: {
    type: Array,
    default: ["Any"]
  },
  campaignFiles: {
    type: Array,
  },
  campaignLinks: {
    type: Array,
  },
  deliveryDate: {
    type: Date,
  },
  campaignType: {
    type: Array,
  }
}, { timestamps: true });

campaignSchema.plugin(mongoosePaginate);
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