const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	local: {
		email: String,
		password: String
	}
});

module.exports = mongoose.model('User', User);
