const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true,
  },
  clientname: {
    type: String,
    required: true,
  },
  numberOfPersons: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v); // Basic email validation
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'], // Status options
    default: 'pending', // Default status
  },
}, {
  timestamps: true, // Automatically create createdAt and updatedAt fields
});

module.exports = mongoose.model('Reservation', ReservationSchema);
