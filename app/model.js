// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var FoodSchema = new Schema({
    dish: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    type: {type: String, required: true},
    img: {type: String, required: true},
    options: {type: String, required: true}
});
// Creates a User Schema. This will be the basis of how user data is stored in the db
var UserSchema = new Schema({

    email: {type: String, required: true},
    fullname: {type: String, required: true},
    username: {type: String, required: true},
    cook: {type: Boolean, default: false},
    foods: [FoodSchema],
    //favlang: {type: String, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    socialId: String,
    rating: {type: Number},
    provider: String,
    loginCount: Number
});

// Sets the created_at parameter equal to the current time
UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
UserSchema.index({location: '2dsphere'});

// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "scotch-users"
module.exports = mongoose.model('scotch-user', UserSchema);