const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');

const listingSchema = new mongoose.Schema({
  	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	registered: {
		type: Boolean,
		default: false,
	},
	banner: {
		type: String,
	},
	profilePic: {
		type: String,
	},
	platform: {
		type: String,
	},
	posts: {
		type: Array,
	},
	posts_images: {
		type: Array,
	},
	no_posts: {
		type: Number,
	},
	social_media_handle: {
		type: String,
	},
	views_avg: {
		type: Number,
	},
	likes_avg: {
		type: Number,
	},
	comments_avg: {
		type: Number,
	},
	shares_avg: {
		type: Number,
	},
	followees_avg: {
		type: Number,
	},
	followers_avg: {
		type: Number,
	},
	engagement_avg: {
		type: Number,
	},
	categories: {
		type: Array,
	},
	subscribers: {
		type: Number,
	},
	deals: {
		type: [
			{
				title: {
					type: String,
				},
				description: {
					type: String,
				},
				amount: {
					type: Number,
				},
				custom_amount: {
					type: Boolean,
				},
				delivery_time: {
					type: String,
				}
			}
		]
	},
	contact_links: {
		type: Array,
	},
	url: {
		type: String,
	},
}, { timestamps: true });

listingSchema.plugin(mongoosePaginate);
const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;